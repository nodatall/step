import React from 'react'
import axios from 'axios'
import { Router, Route, browserHistory } from 'react-router'
import componentErrorHandler from '../utilities/componentErrorHandler'
import ProjectListContainer from '../ProjectsList/ProjectListContainer'
import LoginContainer from '../Login/LoginContainer'
import globalState from '../utilities/globalState'
import GlobalStateComponent from '../reusable/ParentClasses/GlobalStateComponent'

export default class App extends GlobalStateComponent {
  constructor() {
    super()
    this.state = globalState.get()
  }

  componentDidMount() {
    axios.get( `${__HOST__}/session` ) // eslint-disable-line
      .then( response => {
        if ( response.data.userId ) {
          globalState.set({
            userId: response.data.userId,
            currentProjectId: 2,
            couldDos: {},
            projects: []
          })
        } else {
          browserHistory.push( '/login' )
        }
      })
      .catch( componentErrorHandler( 'App' ) )
  }

  render() {
    return (
      <Router history={ browserHistory } >
        <Route path='/' component={ ProjectListContainer } />
        <Route path='/login' component={ LoginContainer } />
      </Router>
    )
  }
}
