import React from 'react'
import axios from 'axios'
import componentErrorHandler from '../utilities/componentErrorHandler'
import globalState from '../utilities/globalState'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'
import CouldDo from './CouldDo'
import Loader from '../reusable/Loader/Loader'

export default class CouldDoContainer extends GlobalStateComponent {
  constructor( props ) {
    super( props )
    this.previousCouldDo = this.previousCouldDo.bind( this )
    this.nextCouldDo = this.nextCouldDo.bind( this )
    globalState.set({ currentCouldDoIndex: 0 })
  }

  previousCouldDo = () => {
    const newIndex = this.state.currentCouldDoIndex - 1
    globalState.set({ currentCouldDoIndex: newIndex })
  }

  nextCouldDo = () => {
    const newIndex = this.state.currentCouldDoIndex + 1
    globalState.set({ currentCouldDoIndex: newIndex })
  }

  findPosition = ( index, length ) => {
    switch ( index ) {
      case 0:
        return 'beginning'
      case length - 1:
        return 'end'
      default:
        return 'middle'
    }
  }
  
  completeCouldDo = async () => {
    const { projects, currentProjectId, currentCouldDoIndex } = this.state,
      couldDoKeys = Object.keys( projects[currentProjectId].couldDos ),
      currentCouldDoId = projects[currentProjectId].couldDos[couldDoKeys[currentCouldDoIndex]].id
    
    this.setState({ fading: true })
    
    setTimeout( () => {
      axios.post( `/could-do/edit/${currentCouldDoId}`, { is_completed: true } ) // eslint-disable-line
        .then( () => {
          globalState.completeCouldDo( currentCouldDoId )
          if ( couldDoKeys.length === 1 ) {
            this.props.history.replace( '/project' )
          } else if ( currentCouldDoIndex === couldDoKeys.length - 1 ) {
            this.previousCouldDo()
          }
          this.setState({ fading: false })
        })  
        .catch( componentErrorHandler( 'CouldDoContainer' ) )
    }, 500 )
  }

  render() {
    if ( !this.state.projects ) {
      return <Loader />
    } 

    const { currentProjectId, currentCouldDoIndex, projects } = this.state,
      couldDoKeys = Object.keys( projects[currentProjectId].couldDos ),
      position = this.findPosition( currentCouldDoIndex, couldDoKeys.length ),
      text = projects[currentProjectId].couldDos[couldDoKeys[currentCouldDoIndex]].text,
      numCouldDos = couldDoKeys.length

    return <CouldDo
      text={ text }
      position={ position }
      previousCouldDo={ this.previousCouldDo }
      nextCouldDo={ this.nextCouldDo }
      numCouldDos={ numCouldDos }
      completeCouldDo={ this.completeCouldDo }
      fading={ this.state.fading }
    />
  }

}
