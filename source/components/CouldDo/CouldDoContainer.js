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
    this.state = { addingNew: false, newCouldDoValue: '' }
    
    this.previousCouldDo = this.previousCouldDo.bind( this )
    this.nextCouldDo = this.nextCouldDo.bind( this )
    this.onChange = this.onChange.bind( this )
    this.handleKeyUp = this.handleKeyUp.bind( this )
    this.switchToAdding = this.switchToAdding.bind( this )
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

  addCouldDo = () => {
    const { currentProjectId: project_id, newCouldDoValue: text } = this.state,
      newItem = { text, project_id }
    
    if ( newItem.text === '' ) return 
    
    axios.post( '/could-do/new', newItem )
      .then( response => {
        globalState.addCouldDo( response.data )
        this.setState({ newCouldDoValue: '', addingNew: false })
      })
    .catch( componentErrorHandler( 'couldDoContainer' ) )
  }
  
  onChange( event ) { this.setState({ newCouldDoValue: event.target.value }) }
  
  handleKeyUp( event ) {
    if ( event.key === 'Enter' ) {
      this.addCouldDo()
    }
  }

  switchToAdding() {
    this.setState({ addingNew: !this.state.addingNew })
  }
  
  render() {
    if ( !this.state.projects ) {
      return <Loader />
    } 

    const { currentProjectId, currentCouldDoIndex, projects } = this.state,
      currentProject = projects[currentProjectId],
      couldDoKeys = Object.keys( currentProject.couldDos ),
      couldDos = couldDoKeys
        .map( ( curIndex ) => currentProject.couldDos[curIndex] )
        .sort( ( a, b ) => a.order > b.order ),
      position = this.findPosition( currentCouldDoIndex, couldDoKeys.length ),
      text = couldDos[currentCouldDoIndex].text,
      numCouldDos = couldDoKeys.length

    return <CouldDo
      text={ text }
      position={ position }
      previousCouldDo={ this.previousCouldDo }
      nextCouldDo={ this.nextCouldDo }
      numCouldDos={ numCouldDos }
      completeCouldDo={ this.completeCouldDo }
      fading={ this.state.fading }
      addingNew={ this.state.addingNew }
      value={ this.state.newCouldDoValue }
      onChange={ this.onChange }
      switchToAdding={ this.switchToAdding }
      onKeyUp={ this.handleKeyUp }
    />
  }

}
