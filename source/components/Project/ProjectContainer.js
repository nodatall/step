/* global __HOST__ */
import React from 'react'
import axios from 'axios'
import globalState from '../utilities/globalState'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'
import Project from './Project'
import componentErrorHandler from '../utilities/componentErrorHandler'

export default class ProjectContainer extends GlobalStateComponent {
  componentDidMount() {
    const { currentProjectId, projects } = this.state

    if ( !projects[currentProjectId].couldDos ) {
      axios.get( `${__HOST__}/project/${currentProjectId}/could-do` )
        .then( ({ data: couldDos }) => {
          projects[currentProjectId].couldDos = couldDos.reduce( ( accumulator, { id, text }) =>
            Object.assign( accumulator, { [id]: { id, text } })
          , {})
          globalState.set({ projects })
        })
        .catch( componentErrorHandler( 'ProjectContainer' ) )
    }
  }

  render() {
    let couldDos = {}, project = {}
    const { currentProjectId, projects } = this.state

    if ( currentProjectId ) {
      couldDos = projects[currentProjectId].couldDos
      project = projects[currentProjectId]
    }

    return (
      <Project
        couldDos={ couldDos }
        project={ project }
        currentProjectId={ currentProjectId } />
    )
  }

}
