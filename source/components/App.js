import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import ProjectContainer from './Project/ProjectContainer'
import LoginContainer from './Login/LoginContainer'

const App = () => (
  <Router history={ browserHistory }>
    <Route path='/' component={ ProjectContainer } />
    <Route path='/login' component={ LoginContainer } />
  </Router>
)

export default App
