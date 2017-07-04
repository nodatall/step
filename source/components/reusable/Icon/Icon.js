/* global __ENV__ */
import React from 'react'

let EyeIcon, DeleteIcon, DragHandleIcon, AddIcon, ArrowIcon, IntoProjectIcon

if ( __ENV__ !== 'test' ) {
  EyeIcon = require( './iconSVG/eyeIcon.svg' ).default // eslint-disable-line
  DeleteIcon = require( './iconSVG/deleteIcon.svg' ).default // eslint-disable-line
  DragHandleIcon = require( './iconSVG/dragHandleIcon.svg' ).default // eslint-disable-line
  AddIcon = require( './iconSVG/addIcon.svg' ).default // eslint-disable-line
  ArrowIcon = require( './iconSVG/arrowIcon.svg' ).default // eslint-disable-line
  IntoProjectIcon = require( './iconSVG/recycleIcon.svg' ).default // eslint-disable-line
}

const Icon = ({ type, onClick }) => {
  let icon

  if ( `${__ENV__}` === 'test' ) {
    type = 'default' // eslint-disable-line
  }

  switch ( type ) {
    case 'eye':
      icon = <EyeIcon />
      break
    case 'delete':
      icon = <DeleteIcon />
      break
    case 'dragHandle':
      icon = <DragHandleIcon />
      break
    case 'plus':
      icon = <AddIcon />
      break
    case 'back':
      icon = <ArrowIcon />
      break
    case 'intoProject':
      icon = <IntoProjectIcon />
      break
    default:
      icon = `icon: ${type}`
  }

  return (
    <div className={ `${type}-icon-container` } onClick={ onClick }>
      { icon }
    </div>
  )
}

export default Icon
