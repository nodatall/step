/* global __HOST__ */

import React, { Component } from 'react'
import Logout from './Logout'

export default class LogoutContainer extends Component {
  static redirect( path ) {
    location.href = path
  }

  render() {
    return <Logout redirect={ LogoutContainer.redirect } path={ `${__HOST__}/logout` } />
  }
}
