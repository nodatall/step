import React from 'react'

const TextFieldInputPresentation = ({ value, onChange, onKeyUp }) =>
  <input onChange={ onChange } value={ value } onKeyUp={ onKeyUp } />

export default TextFieldInputPresentation
