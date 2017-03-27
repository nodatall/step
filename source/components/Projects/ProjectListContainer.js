import React, { Component } from 'react'
import axios from 'axios'
import componentErrorHandler from '../componentErrorHandler'
import ProjectListPresentation from './ProjectListPresentation'
import globalState from '../globalState'

export default class ProjectListContainer extends Component {
  constructor() {
    super()
    this.state = globalState.get()
    globalState.subscribe(this.updateState)
  }

  componentDidMount = () => {
    axios.get(`http://localhost:1337/user/${this.state.userId}/projects`)
      .then( body => {
        globalState.set({ projects: body.data })
      })
      .catch( error => componentErrorHandler( 'ProjectListContainer', error ) )
  }

  componentWillUnmount = () => globalState.unsubscribe(this.updateState)

  updateState = newState => this.setState( newState )

  render() {
    return <ProjectListPresentation projects={ this.state.projects } />
  }
}
