import React from 'react'
import FooterContainer from '../reusable/Footer/FooterContainer'
import PageInstruction from '../reusable/Instructions/PageInstruction'
import Heading from '../reusable/Heading/Heading'
import RowListContainer from '../reusable/Row/RowListContainer'

const ProjectMenu = ({ projects = {}, currentProjectId }) => {
  const projectList = Object.keys( projects ).length ?
    <RowListContainer items={ projects } type='project' /> :
    <PageInstruction text='Click below to take your first step' />

  return (
    <div className='project-menu-container'>
      <Heading text={ 'Projects' } />
      { projectList }
      <FooterContainer type='project' currentProjectId={ currentProjectId } />
    </div>
  )
}

export default ProjectMenu
