import React from 'react'
import Icon from './Icon'

const IconList = ({ type, deleteItems, turnIntoProject }) => {
  const makeIntoProject = type === 'could-do' ?
    <Icon type='intoProject' onClick={ turnIntoProject } /> : null

  return (
    <div className='iconlist-container'>
      { makeIntoProject }
      <Icon type='delete' onClick={ deleteItems } />
    </div>
  )
}

export default IconList
