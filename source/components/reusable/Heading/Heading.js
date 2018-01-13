import React from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon/Icon'
import LogoutContainer from '../../Logout/LogoutContainer'

const Heading = ({ type, text, loggedOut }) => {
  const eyeIcon = type === 'project' ?
    <Link to='/could-do'><Icon type='eye' /></Link> :
    null
  const logoutContainer = !loggedOut ? <LogoutContainer /> : null

  return (
    <div className='heading-container'>
      <h1>{ text }</h1>
      { eyeIcon }
      { logoutContainer }
    </div>
  )
}

export default Heading
