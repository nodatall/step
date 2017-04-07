import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import ProjectContainer from './Project/ProjectContainer'

const App = () => (
  <Router history={ browserHistory }>
    <Route path='/' component={ ProjectContainer } />
  </Router>
)

export default App
