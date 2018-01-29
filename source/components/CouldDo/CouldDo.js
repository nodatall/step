import React from 'react'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import Icon from '../reusable/Icon/Icon'

const CouldDo = ({ text, position, previousCouldDo, nextCouldDo, numCouldDos, completeCouldDo, fading }) => { // eslint-disable-line

  const upDownButtons = []

  if ( position !== 'beginning' ) {
    upDownButtons.push( <button className='previous-could-do' key='up' onClick={ previousCouldDo }><Icon type='previous' /></button> )
  }

  if ( position !== 'end' && numCouldDos > 1 ) {
    upDownButtons.push( <button className='next-could-do' key='down' onClick={ nextCouldDo }><Icon type='next' /></button> )
  }

  return (
    <div className='could-do-container'>
      <button className='add-could-do' key='add'><Icon type='plus' /></button>
      { upDownButtons }
      <Link to='/project'><Icon type='back' /></Link>
      <p className={ fading ? 'could-do-fading' : 'could-do' } onClick={ completeCouldDo } data-tip='Click to complete'>{ text }</p>
      <ReactTooltip delayShow={ 350 } className='tooltip' />
    </div>
  )
}

export default CouldDo
