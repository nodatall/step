import React from 'react'
import globalState from '../utilities/globalState'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'
import CouldDo from './CouldDo'

export default class CouldDoContainer extends GlobalStateComponent {
  constructor( props ) {
    super( props )
    this.previousCouldDo = this.previousCouldDo.bind( this )
    this.nextCouldDo = this.nextCouldDo.bind( this )
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
    if ( index === 0 ) {
      return 'first'
    } else if ( index === length - 1 ) {
      return 'last'
    } else {
      return 'other'
    }
  }

  render() {
    const projectId = this.state.currentProjectId
    const currentCouldDoIndex = this.state.currentCouldDoIndex

    const position = this.findPosition( currentCouldDoIndex, this.state.couldDos[projectId].length )
    const text = this.state.couldDos[projectId][currentCouldDoIndex].text

    return <CouldDo
      text={ text }
      position={ position }
      previousCouldDo={ this.previousCouldDo }
      nextCouldDo={ this.nextCouldDo }
    />
  }

}
