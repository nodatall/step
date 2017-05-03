import React from 'react'
import globalState from '../utilities/globalState'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'
import CouldDo from './CouldDo'

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

  render() {
    if ( !this.state.projects ) {
      return <div className='loading'> Loading . . .</div>
    }

    const { currentProjectId, currentCouldDoIndex, projects } = this.state
    const couldDoKeys = Object.keys( projects[currentProjectId].couldDos )
    const position = this.findPosition( currentCouldDoIndex, couldDoKeys.length )
    const text = projects[currentProjectId].couldDos[couldDoKeys[currentCouldDoIndex]].text

    return <CouldDo
      text={ text }
      position={ position }
      previousCouldDo={ this.previousCouldDo }
      nextCouldDo={ this.nextCouldDo }
    />
  }

}
