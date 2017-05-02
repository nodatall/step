/* global __ENV__ */
import React from 'react'

let EyeIcon, DeleteIcon, DragHandleIcon, AddIcon

if ( __ENV__ !== 'test' ) {
  EyeIcon = require( './iconSVG/eyeIcon.svg' ).default // eslint-disable-line
  DeleteIcon = require( './iconSVG/deleteIcon.svg' ).default // eslint-disable-line
  DragHandleIcon = require( './iconSVG/dragHandleIcon.svg' ).default // eslint-disable-line
  AddIcon = require( './iconSVG/addIcon.svg' ).default // eslint-disable-line
}

const Icon = ({ type, onClick }) => {
  let icon

  if ( `${__ENV__}` === 'test' ) {
    type = 'default' // eslint-disable-line
  }

  switch ( type ) {
    case 'eye':
      icon = <EyeIcon className='icon' width={ 90 } height={ 90 } />
      break
    case 'delete':
      icon = <DeleteIcon className='icon' width={ 30 } height={ 30 } />
      break
    case 'dragHandle':
      icon = <DragHandleIcon className='icon' width={ 30 } height={ 30 } />
      break
    case 'plus':
      icon = <AddIcon className='icon' width={ 30 } height={ 30 } />
      break
    default:
      icon = `icon: ${type}`
  }

  return (
    <div onClick={ onClick }>
      { icon }
    </div>
  )
}

export default Icon
