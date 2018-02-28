import React from 'react'
import { Link } from 'react-router-dom'
import ReactTooltip from 'react-tooltip'
import AutosizeInput from 'react-input-autosize'
import Icon from '../reusable/Icon/Icon'
import { MAXLENGTH } from '../utilities/constants'

const CouldDo = ({
  text, 
  position, 
  previousCouldDo,
  nextCouldDo, 
  numCouldDos, 
  completeCouldDo, 
  fading,
  value,
  onChange,
  onKeyUp,
  addingNew,
  switchToAdding
}) => {

  const upDownButtons = []

  if ( position !== 'beginning' ) {
    upDownButtons.push( <button className='previous-could-do' key='up' onClick={ previousCouldDo }><Icon type='previous' /></button> )
  }

  if ( position !== 'end' && numCouldDos > 1 ) {
    upDownButtons.push( <button className='next-could-do' key='down' onClick={ nextCouldDo }><Icon type='next' /></button> )
  }

  const couldDo = <p className={ fading ? 'could-do-fading' : 'could-do' } onClick={ completeCouldDo } data-tip='Click to complete'>{ text }</p>,
    newCouldDoField = <AutosizeInput
      className='could-do-adding'
      type='text'
      placeholder={ 'New could do' }
      value={ value }
      onChange={ onChange }
      onKeyUp={ onKeyUp }
      maxLength={ MAXLENGTH }
      autoFocus
    />,
    mainContent = addingNew ? newCouldDoField : couldDo

  return (
    <div className='could-do-container'>
      <button className='add-could-do' onClick={ switchToAdding } key='add'><Icon type='plus' /></button>
      { upDownButtons }
      <Link to='/project'><Icon type='back' /></Link>
      { mainContent }
      <ReactTooltip delayShow={ 350 } className='tooltip' />
    </div>
  )
}

export default CouldDo
