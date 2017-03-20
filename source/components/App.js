import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router'
import ProjectsContainer from './Projects/ProjectsContainer'

export default class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={ProjectsContainer} />
      </Router>
    )
  }
}
