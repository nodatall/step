import React from 'react'
import EyeIcon from './iconSVG/eyeIcon.svg'
import DeleteIcon from './iconSVG/deleteIcon.svg'
import DragHandleIcon from './iconSVG/dragHandleIcon.svg'
import AddIcon from './iconSVG/addIcon.svg'

const Icon = ({ type, onClick }) => {
  let icon

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
