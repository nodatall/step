import React from 'react'
import Icon from './Icon'

const IconList = ({ type, deleteItems }) => {
  const makeIntoProject = type === 'could-do' ?
    <Icon type='intoProject' /> : null

  return (
    <div className='iconlist-container'>
      <Icon type='dragAndDrop' />
      { makeIntoProject }
      <Icon type='delete' onClick={ deleteItems } />
    </div>
  )
}

export default IconList
