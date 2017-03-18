import React from 'react'
import TextFieldContainer from '../TextField/TextFieldContainer'
import IconPresentation from '../Icon/IconPresentation'

export default ({ name, id }) => (
  <div className='project-container'>
    <TextFieldContainer text={ name } id={ id } type='projects' />
    <IconPresentation type='eye' />
  </div>
)
