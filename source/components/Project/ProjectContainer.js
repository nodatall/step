import React from 'react'
import axios from 'axios'
import globalState from '../utilities/globalState'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'
import Project from './Project'
import componentErrorHandler from '../utilities/componentErrorHandler'

export default class ProjectContainer extends GlobalStateComponent {
  constructor() {
    super()
    this.state = globalState.get()
    globalState.subscribe( this.updateState )
    this.projectId = this.state.currentProjectId
  }

  componentDidMount() {
    axios.get( `${__HOST__}/project/${this.projectId}/could-do` ) //eslint-disable-line
      .then( response => globalState.set({ couldDos: { [this.projectId]: response.data } }) )
      .catch( componentErrorHandler( 'ProjectContainer' ) )
  }

  render() {
    const couldDos = this.state.couldDos[this.projectId]
    const project = this.state.projects.filter(
      currentProject => currentProject.id === this.projectId
    )

    return <Project couldDos={ couldDos } project={ project } />
  }

}
