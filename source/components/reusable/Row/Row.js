import React from 'react'
import TextFieldContainer from '../TextField/TextFieldContainer'
import Icon from '../Icon/Icon'
import IconList from '../Icon/IconList'

const Row = ({ text, id, fieldType }) => {
  const eyeIcon = fieldType === 'project' ? <Icon type='eye' /> : null

  return (
    <div className='row-container'>
      <TextFieldContainer text={ text } id={ id } type={ fieldType } />
      <IconList type={ fieldType } />
      { eyeIcon }
    </div>
  )
}


export default Row
