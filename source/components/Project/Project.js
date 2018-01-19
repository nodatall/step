import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../reusable/Heading/Heading'
import RowListContainer from '../reusable/Row/RowListContainer'
import FooterContainer from '../reusable/Footer/FooterContainer'
import PageInstruction from '../reusable/Instructions/PageInstruction'
import Icon from '../reusable/Icon/Icon'

const Project = ({ couldDos, project, currentProjectId }) => {
  const couldDoList = couldDos && Object.keys( couldDos ).length ? 
    <RowListContainer type='could-do' items={ couldDos } /> :
    <PageInstruction text='Add your fist could do below' />
    
  return (
    <div className='project-container' >
      <Heading type='project' text={ project.text } />
      <Link to='/'><Icon type='back' /></Link>
      { couldDoList }
      <FooterContainer type='could-do' currentProjectId={ currentProjectId } />
    </div>
  )
}

export default Project
