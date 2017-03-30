import React from 'react'
import Project from '../Project/ProjectPresentation'

const ProjectListPresentation = ({ projects }) => {
  let projectList

  if ( projects ) {
    projectList = projects.map( project =>
      <Project key={ project.id } { ...project } />
    )
  } else {
    projectList = <div> Loading . . .</div>
  }

  return (
    <div>
      { projectList }
    </div>
  )
}

export default ProjectListPresentation
