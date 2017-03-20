import React from 'react'
import TextFieldContainer from '../TextField/TextFieldContainer'
import IconPresentation from '../Icon/IconPresentation'

export default ({ text, id }) => (
  <div className='project-container'>
    <TextFieldContainer text={ text } id={ id } type='projects' />
    <IconPresentation type='eye' />
  </div>
)
