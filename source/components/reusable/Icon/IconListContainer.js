/* global __HOST__ */
import React, { Component } from 'react'
import axios from 'axios'
import componentErrorHandler from '../../utilities/componentErrorHandler'
import globalState from '../../utilities/globalState'
import IconList from './IconList'

export default class IconListContainer extends Component {
  constructor( props ) {
    super( props )
    this.deleteItems = this.deleteItems.bind( this )
  }

  deleteItems() {
    const { type, id } = this.props

    axios.post( `${__HOST__}/${type}/delete/${id}` )
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


  render() {
    return <IconList deleteItems={ this.deleteItems } />
  }
}
