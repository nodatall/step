import React from 'react'
import AutosizeInput from 'react-input-autosize'
import { MAXLENGTH } from '../../utilities/constants'

const TextField = ({ value, onChange, onKeyUp, editing, onClick }) => (
  <AutosizeInput
    className={ `text-field-input${editing ? ' editing' : ''}` }
    onChange={ onChange }
    value={ value }
    maxLength={ MAXLENGTH }
    onKeyUp={ onKeyUp }
    onClick={ onClick } /> 
)

export default TextField
