import React from 'react'
import Icon from '../Icon/Icon'

const Heading = ({ type, text }) => {
  const eyeIcon = type === 'project' ? <Icon type='eye' /> : null

  return (
    <div className='heading-container'>
      <h1>{ text }</h1>
      { eyeIcon }
    </div>
  )
}

export default Heading
