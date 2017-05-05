import React from 'react'
import { SortableHandle } from 'react-sortable-hoc'
import TextFieldContainer from '../TextField/TextFieldContainer'
import Icon from '../Icon/Icon'
import IconListContainer from '../Icon/IconListContainer'

const Row = ({ text, id, fieldType, goToProject }) => {
  const eyeIcon = fieldType === 'project' ?
    <Icon type='eye' onClick={ goToProject } /> :
    null

  const DragHandle = SortableHandle( () =>
    (
      <IconListContainer text={ text } type={ fieldType } id={ id } />
    )
  )

  return (
    <div className='row-container'>
      <TextFieldContainer text={ text } id={ id } type={ fieldType } />
      <DragHandle />
      { eyeIcon }
    </div>
  )
}

export default Row
