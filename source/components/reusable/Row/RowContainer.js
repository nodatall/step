import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Row from './Row'
import globalState from '../../utilities/globalState'

export default class RowContainer extends Component {
  constructor() {
    super()
    this.goToProject = this.goToProject.bind( this )
  }

  async goToProject() {
    const { id } = this.props
    await globalState.setCurrentProjectId( id )
    browserHistory.push( '/project' )
  }

  render() {
    return <Row goToProject={ this.goToProject } { ...this.props } />
  }
}
