import React from 'react'
import Heading from '../reusable/Heading/Heading'
import RowList from '../reusable/Row/RowList'

const Project = ({ couldDos, project }) => (
  <div className='project-container' >
    <Heading type='project' text={ project.text } />
    <RowList type='couldDo' items={ couldDos } />
  </div>
)

export default Project
