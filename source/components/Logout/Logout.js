import React from 'react'
import Icon from '../reusable/Icon/Icon'

const Logout = ({ redirect, path }) => (
  <div className='logout-container'>
    <Icon className='logout-button' type='logout' onClick={ () => redirect( path ) } />
  </div>
)

export default Logout
