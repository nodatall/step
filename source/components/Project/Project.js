import React from 'react'
import { Link } from 'react-router-dom'
import Heading from '../reusable/Heading/Heading'
import RowList from '../reusable/Row/RowList'
import FooterContainer from '../reusable/Footer/FooterContainer'
import Icon from '../reusable/Icon/Icon'

const Project = ({ couldDos, project }) => (
  <div className='project-container' >
    <Heading type='project' text={ project.text } />
    <Link to='/'><Icon type='back' /></Link>
    <RowList type='could-do' items={ couldDos } />
    <FooterContainer type='could-do' />
  </div>
)

export default Project
