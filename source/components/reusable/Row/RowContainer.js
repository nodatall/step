import React, { Component, PropTypes } from 'react'
import Row from './Row'
import globalState from '../../utilities/globalState'

export default class RowContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor() {
    super()
    this.goToProject = this.goToProject.bind( this )
  }

  async goToProject() {
    const { id } = this.props
    await globalState.setCurrentProjectId( id )
    this.context.router.history.push( '/project' )
  }

  render() {
    return <Row goToProject={ this.goToProject } { ...this.props } />
  }
}
