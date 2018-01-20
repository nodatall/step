import React from 'react'
import Loader from '../reusable/Loader/Loader'
import FooterContainer from '../reusable/Footer/FooterContainer'
import PageInstruction from '../reusable/Instructions/PageInstruction'
import Heading from '../reusable/Heading/Heading'
import RowListContainer from '../reusable/Row/RowListContainer'

const ProjectMenu = ({ projects = {}, currentProjectId, loaded }) => {
  const projectList = Object.keys( projects ).length ?
    <RowListContainer items={ projects } type='project' /> :
    <PageInstruction text='Add your first project below' />,
    content = loaded ? projectList : <Loader />

  return (
    <div className='project-menu-container'>
      <Heading text={ 'Projects' } />
      { content }
      <FooterContainer type='project' currentProjectId={ currentProjectId } />
    </div>
  )
}

export default ProjectMenu

