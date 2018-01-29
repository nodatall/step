import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../reusable/Heading/Heading'
import Loader from '../reusable/Loader/Loader'
import RowListContainer from '../reusable/Row/RowListContainer'
import FooterContainer from '../reusable/Footer/FooterContainer'
import PageInstruction from '../reusable/Instructions/PageInstruction'
import Icon from '../reusable/Icon/Icon'

const Project = ({ couldDos, project, currentProjectId, loaded }) => {
  const hasCouldDos = couldDos && Object.keys( couldDos ).length
  const couldDoList = hasCouldDos ? 
    <RowListContainer type='could-do' items={ couldDos } /> :
    <PageInstruction text='Add your first could do below' />,
    content = loaded ? couldDoList : <Loader />
    
  return (
    <div className='project-container' >
      <Heading type='project' text={ project.text } hasCouldDos={ hasCouldDos } />
      <Link to='/'><Icon type='back' /></Link>
      { content }
      <FooterContainer type='could-do' currentProjectId={ currentProjectId } />
    </div>
  )
}

export default Project
