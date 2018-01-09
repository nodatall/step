import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../reusable/Heading/Heading'
import RowListContainer from '../reusable/Row/RowListContainer'
import FooterContainer from '../reusable/Footer/FooterContainer'
import Icon from '../reusable/Icon/Icon'

const Project = ({ couldDos, project, currentProjectId }) => (
  <div className='project-container' >
    <Heading type='project' text={ project.text } />
    <Link to='/'><Icon type='back' /></Link>
    <RowListContainer type='could-do' items={ couldDos } />
    <FooterContainer type='could-do' currentProjectId={ currentProjectId } />
  </div>
)

export default Project
