import React, { Component } from 'react'
import Login from './Login'

export default class LoginContainer extends Component {
  static redirect( path ) {
    location.href = path
  }

  render() {
    return <Login redirect={ LoginContainer.redirect } path={ `http://localhost:1337/auth/google` } />
  }
}
