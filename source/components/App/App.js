import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import Landing from './Landing'
import ProjectContainer from '../Project/ProjectContainer'
import CouldDoContainer from '../CouldDo/CouldDoContainer'

const App = () => (
  <Router history={ browserHistory } >
    <Route path='/' component={ Landing } />
    <Route path='/project' component={ ProjectContainer } />
    <Route path='/could-do' component={ CouldDoContainer } />
  </Router>
)

export default App
