import React from 'react'
import AutosizeInput from 'react-input-autosize'
import Icon from '../Icon/Icon'

const Footer = ({ type, onChange, value, addItem, onKeyUp }) => {
  let text = null

  if ( type === 'project' ) text = 'New project'
  else if ( type === 'could-do' ) text = 'New could do'

  return (
    <div className='footer-container'>
      <button className='plus-button' onClick={ addItem }><Icon type='plus' /></button>
      <AutosizeInput
        className='footer-input-text'
        type='text'
        placeholder={ text }
        value={ value }
        onChange={ onChange }
        onKeyUp={ onKeyUp }
        maxLength='25'
      />
    </div>
  )
}

export default Footer
