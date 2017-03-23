import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import ProjectListContainer from './Projects/ProjectListContainer'

const App = () => (
  <Router history={ browserHistory }>
    <Route path='/' component={ ProjectListContainer } />
  </Router>
)

export default App
