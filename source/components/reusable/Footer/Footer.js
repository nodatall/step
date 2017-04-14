import React from 'react'
Import Icon from '../Icon/Icon'

const Footer = ({ type, onChange, value, onSubmit }) => {
  let text = null

  if ( type === 'project' ) text = 'Create new project'
  else if ( type === 'couldDo' ) text = 'Add a could do'

  return (
    <div className='footer-container'>
      <button onClick={ onSubmit }><Icon type='plus' /></button>
      <input type='text' placeholder={ text } value={ value } onChange={ onChange } />
    </div>
  )
}

export default Footer
