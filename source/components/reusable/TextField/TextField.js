import React from 'react'

const TextField = ({ value, onChange, onKeyUp, editing }) => {
  const inputOrText = editing ?
    <input
      className='text-field-input'
      onChange={ onChange }
      value={ value }
      onKeyUp={ onKeyUp } /> :
    <div className='text-field-text'>{ value }</div>

  return inputOrText
}

export default TextField
