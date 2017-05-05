import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { SortableElement } from 'react-sortable-hoc'
import Row from './Row'
import globalState from '../../utilities/globalState'

export default class RowContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor( props ) {
    super( props )
    this.goToProject = this.goToProject.bind( this )
  }

  async goToProject() {
    const { id } = this.props
    await globalState.setCurrentProjectId( id )
    this.context.router.history.push( '/project' )
  }

  render() {
    const { order } = this.props
    const SortableRow = SortableElement( ( ) =>
      <li><Row goToProject={ this.goToProject } { ...this.props } /></li>
    )
    return <SortableRow key={ `item-${order}` } index={ order } />
  }
}
