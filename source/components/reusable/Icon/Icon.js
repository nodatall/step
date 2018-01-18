/* global __ENV__ */
import React from 'react'
import ReactTooltip from 'react-tooltip'

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
      icon = <EyeIcon onClick={ onClick } data-tip='Focus in' />
      break
    case 'delete':
      icon = <DeleteIcon onClick={ onClick } data-tip='Delete' />
      break
    case 'dragHandle':
      icon = <DragHandleIcon onClick={ onClick } data-tip='Drag to reorder' />
      break
    case 'plus':
      icon = <AddIcon onClick={ onClick } data-tip='Add new' />
      break
    case 'back':
      icon = <ArrowIcon onClick={ onClick } data-tip='Go back' />
      break
    case 'intoProject':
      icon = <IntoProjectIcon onClick={ onClick } data-tip='Turn into project' />
      break
    case 'logout':
      icon = <LogoutIcon onClick={ onClick } data-tip='Logout' />
      break
    default:
      icon = `icon: ${type}`
  }

  return (
    <div className={ `${type}-icon-container` } >
      { icon }
      <ReactTooltip delayShow={ 350 } className='tooltip' />
    </div>
  )
}

export default Icon
