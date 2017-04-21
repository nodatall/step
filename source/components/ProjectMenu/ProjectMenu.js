import React from 'react'
import FooterContainer from '../reusable/Footer/FooterContainer'
import PageInstruction from '../reusable/Instructions/PageInstruction'
import Heading from '../reusable/Heading/Heading'
import RowList from '../reusable/Row/RowList'

const ProjectMenu = ({ projects = {}, currentProjectId }) => {
  const projectList = Object.keys( projects ).length ?
    <RowList items={ projects } type='project' /> :
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
