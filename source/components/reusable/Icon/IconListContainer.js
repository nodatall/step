import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import axios from 'axios'
import componentErrorHandler from '../../utilities/componentErrorHandler'
import globalState from '../../utilities/globalState'
import IconList from './IconList'

export default class IconListContainer extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor( props ) {
    super( props )
    this.deleteItems = this.deleteItems.bind( this )
    this.turnIntoProject = this.turnIntoProject.bind( this )
  }

  deleteItems() {
    const { type, id } = this.props

    axios.post( `/${type}/delete/${id}` )
      .then( () => {
        switch ( type ) {
          case 'project':
            globalState.deleteProject( id )
            break
          case 'could-do':
            globalState.deleteCouldDo( id )
            break
          default:
        }
      })
      .catch( componentErrorHandler( 'IconListContainer' ) )
  }

  turnIntoProject() {
    const newProjectName = this.props.text

    this.deleteItems()
    axios.post( '/project/new', { text: newProjectName })
      .then( ({ data: { id } }) => {
        globalState.addProject({ id, text: newProjectName })
        globalState.setCurrentProjectId( id )
        this.context.router.history.push( '/project' )
      })
      .catch( componentErrorHandler( 'IconListContainer' ) )
  }

  render() {
    const { type } = this.props
    return (
      <IconList
        type={ type }
        deleteItems={ this.deleteItems }
        turnIntoProject={ this.turnIntoProject }
      />
    )
  }
}
