import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './Landing'
import ProjectContainer from '../Project/ProjectContainer'
import CouldDoContainer from '../CouldDo/CouldDoContainer'

const App = () => (
  <Router>
    <div>
      <Route exact path='/' component={ Landing } />
      <Route path='/project' component={ ProjectContainer } />
      <Route path='/could-do' component={ CouldDoContainer } />
    </div>
  </Router>
)

export default App
