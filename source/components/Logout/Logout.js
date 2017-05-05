import React from 'react'

const Logout = ({ redirect, path }) => (
  <div className='logout-container'>
    <button className='logout-button' onClick={ () => redirect( path ) }>Logout</button>
  </div>
)

export default Logout
