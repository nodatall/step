import React from 'react'
import Icon from './Icon'

const IconList = ({ type }) => {
  const makeIntoProject = type === 'couldDo' ?
    <Icon type='intoProject' /> : null

  return (
    <div className='iconlist-container'>
      <Icon type='dragAndDrop' />
      { makeIntoProject }
      <Icon type='delete' />
    </div>
  )
}

export default IconList
