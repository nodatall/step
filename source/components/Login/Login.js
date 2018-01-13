import React from 'react'
import Heading from '../reusable/Heading/Heading'

const Login = ({ redirect, path }) => (
  <div className='login-container'>
    <Heading text='Step' loggedOut />
    <button className='login-button' onClick={ () => redirect( path ) }>Login with Google</button>
  </div>
)

export default Login
