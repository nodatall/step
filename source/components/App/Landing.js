import React, { Component } from 'react'
import axios from 'axios'
import ProjectMenuContainer from '../ProjectMenu/ProjectMenuContainer'
import LoginContainer from '../Login/LoginContainer'
import componentErrorHandler from '../utilities/componentErrorHandler'

export default class Landing extends Component {
  constructor() {
    super()
    this.state = { isLoading: true }
  }

  componentWillMount() {
    axios.get( '/session' )
      .then( ({ data: { userId } }) => {
        this.setState({ userId, isLoading: false }) 
      })
      .catch( componentErrorHandler( 'App' ) )
  }

  render() {
    const userId = this.state.userId
    const loginOrProjectMenu = userId ?
      <ProjectMenuContainer userId={ userId } /> :
      <LoginContainer />

    return this.state.isLoading ? <div>Loading...</div> : loginOrProjectMenu
  }
}
