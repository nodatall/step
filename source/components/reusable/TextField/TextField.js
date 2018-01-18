import React from 'react'
import AutosizeInput from 'react-input-autosize'

const TextField = ({ value, onChange, onKeyUp, editing, onClick }) => (
  <AutosizeInput
    className={ `text-field-input${editing ? ' editing' : ''}` }
    onChange={ onChange }
    value={ value }
    maxLength={ 25 }
    onKeyUp={ onKeyUp }
    onClick={ onClick } /> 
)

export default TextField
