import React, { Component } from 'react'
import ProjectsPresentation from './ProjectsPresentation'
import globalState from '../globalState'

export default class ProjectsContainer extends Component {
  constructor() {
    super()
    this.state = globalState.get()
    globalState.subscribe(this.updateState)
  }

  componentWillMount = () => {
    fetch(`http://localhost:3200/user/${this.state.userId}/projects`, { method: 'GET' })
      .then( response => response.json() )
      .then( body => {
        globalState.set({ projects: body })
      })
  }

  componentWillUnmout = () => globalState.unsubscribe(this.updateState)

  updateState = newState => this.setState( newState )

  render() {
    return <ProjectsPresentation projects={ this.state.projects } />
  }
}
