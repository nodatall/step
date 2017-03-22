import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import ProjectsContainer from './Projects/ProjectsContainer'

const App = () => (
  <Router history={ browserHistory }>
    <Route path='/' component={ ProjectsContainer } />
  </Router>
)

export default App
