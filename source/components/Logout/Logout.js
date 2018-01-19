import React from 'react'
import Icon from '../reusable/Icon/Icon'

const Logout = ({ redirect, path }) => (
  <div className='logout-container'>
    <Icon type='logout' onClick={ () => redirect( path ) } />
  </div>
)

export default Logout
