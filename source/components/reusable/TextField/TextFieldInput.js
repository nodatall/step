import React from 'react'

const TextFieldInput = ({ value, onChange, onKeyUp }) =>
  <input onChange={ onChange } value={ value } onKeyUp={ onKeyUp } />

export default TextFieldInput
