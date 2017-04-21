import React from 'react'
import { Link } from 'react-router'
import Icon from '../reusable/Icon/Icon'

const CouldDo = ({ text, position, previousCouldDo, nextCouldDo }) => {

  const upDownButtons = []

  if ( position !== 'beginning' ) {
    upDownButtons.push( <button className='previous-could-do' key='up' onClick={ previousCouldDo }><Icon type='up' /></button> )
  }

  if ( position !== 'end' ) {
    upDownButtons.push( <button className='next-could-do' key='down' onClick={ nextCouldDo }><Icon type='down' /></button> )
  }

  return (
    <div className='could-do-container'>
      <button className='add-could-do' key='add'><Icon type='plus' /></button>
      { upDownButtons }
      <Link to='/project'><Icon type='back' /></Link>
      <p>{ text }</p>
    </div>
  )
}

export default CouldDo
