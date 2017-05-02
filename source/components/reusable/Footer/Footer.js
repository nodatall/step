import React from 'react'
import Icon from '../Icon/Icon'

const Footer = ({ type, onChange, value, addItem, onKeyUp }) => {
  let text = null

  if ( type === 'project' ) text = 'Create new project'
  else if ( type === 'couldDo' ) text = 'Add a could do'

  return (
    <div className='footer-container'>
      <button className='plus-button' onClick={ addItem }><Icon type='plus' /></button>
      <input
        className='footer-input-text'
        type='text'
        placeholder={ text }
        value={ value }
        onChange={ onChange }
        onKeyUp={ onKeyUp }
        maxLength='20'
      />
    </div>
  )
}

export default Footer
