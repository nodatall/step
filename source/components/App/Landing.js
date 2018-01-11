import React, { Component } from 'react'
import axios from 'axios'
import ProjectMenuContainer from '../ProjectMenu/ProjectMenuContainer'
import LoginContainer from '../Login/LoginContainer'
import componentErrorHandler from '../utilities/componentErrorHandler'

export default class Landing extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    axios.get( '/session' )
      .then( ({ data: { userId } }) => {
        if ( userId ) { this.setState({ userId }) }
      })
      .catch( componentErrorHandler( 'App' ) )
  }

  render() {
    const userId = this.state.userId
    const loginOrProjectMenu = userId ?
      <ProjectMenuContainer userId={ userId } /> :
      <LoginContainer />

    return loginOrProjectMenu
  }
}
