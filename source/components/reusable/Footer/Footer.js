import React from 'react'
import Icon from '../Icon/Icon'

const Footer = ({ type, onChange, value, onSubmit }) => {
  let text = null

  if ( type === 'project' ) text = 'Create new project'
  else if ( type === 'couldDo' ) text = 'Add a could do'

  return (
    <div className='footer-container'>
      <button className='plus-button' onClick={ onSubmit }><Icon type='plus' /></button>
      <input className='footer-input-text' type='text' placeholder={ text } value={ value } onChange={ onChange } maxLength='20' />
    </div>
  )
}

export default Footer
