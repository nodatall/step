/* global __ENV__ */
import React from 'react'

let EyeIcon, DeleteIcon, DragHandleIcon, AddIcon, ArrowIcon, IntoProjectIcon, LogoutIcon

if ( __ENV__ !== 'test' ) {
  EyeIcon = require( './iconSVG/eyeIcon.svg' ).default // eslint-disable-line
  DeleteIcon = require( './iconSVG/deleteIcon.svg' ).default // eslint-disable-line
  DragHandleIcon = require( './iconSVG/dragHandleIcon.svg' ).default // eslint-disable-line
  AddIcon = require( './iconSVG/addIcon.svg' ).default // eslint-disable-line
  ArrowIcon = require( './iconSVG/arrowIcon.svg' ).default // eslint-disable-line
  IntoProjectIcon = require( './iconSVG/recycleIcon.svg' ).default // eslint-disable-line
  LogoutIcon = require( './iconSVG/logoutIcon.svg' ).default // eslint-disable-line
}

const Icon = ({ type, onClick }) => {
  let icon

  if ( `${__ENV__}` === 'test' ) {
    type = 'default' // eslint-disable-line
  }

  switch ( type ) {
    case 'eye':
      icon = <EyeIcon onClick={ onClick } />
      break
    case 'delete':
      icon = <DeleteIcon onClick={ onClick } />
      break
    case 'dragHandle':
      icon = <DragHandleIcon onClick={ onClick } />
      break
    case 'plus':
      icon = <AddIcon onClick={ onClick } />
      break
    case 'back':
      icon = <ArrowIcon onClick={ onClick } />
      break
    case 'intoProject':
      icon = <IntoProjectIcon onClick={ onClick } />
      break
    case 'logout':
      icon = <LogoutIcon onClick={ onClick } />
      break
    default:
      icon = `icon: ${type}`
  }

  return (
    <div className={ `${type}-icon-container` } >
      { icon }
    </div>
  )
}

export default Icon
