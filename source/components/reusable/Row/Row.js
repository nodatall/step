import React from 'react'
import TextFieldContainer from '../TextField/TextFieldContainer'
import Icon from '../Icon/Icon'
import IconListContainer from '../Icon/IconListContainer'

const Row = ({ text, id, fieldType, goToProject }) => {
  const eyeIcon = fieldType === 'project' ?
    <Icon type='eye' onClick={ goToProject } /> :
    null

  return (
    <div className='row-container'>
      <TextFieldContainer text={ text } id={ id } type={ fieldType } />
      <IconListContainer text={ text } type={ fieldType } id={ id } />
      { eyeIcon }
    </div>
  )
}


export default Row
