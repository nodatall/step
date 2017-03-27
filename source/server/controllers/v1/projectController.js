import chalk from 'chalk'

import {
  getCouldDosByProjectId
} from '../../../dataServices/database/queries/couldDo'
import {
  newProject,
  editProject,
  deleteProject
} from '../../../dataServices/database/commands/project'
import { getProjectsByUserId } from '../../../dataServices/database/queries/project'

const handleGetCouldDosByProjectId = ( request, response ) => {
  const projectId = request.params.id

  return getCouldDosByProjectId( projectId )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in handleGetCouldDosByProjectId: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).json( { Error: error } )
    })
}

const handleNewProject = ( request, response ) => {
  const attributes = request.body

  return newProject( attributes )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in handleNewProject: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).json( { Error: error } )
    })

}

const handleEditProject = ( request, response ) => {
  const attributes = request.body
  const projectId = request.params.id

  return editProject( projectId, attributes )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => response.status( 400 ).json( { Error: error } ))
}

const handleDeleteProject = ( request, response ) => {
  const projectId = request.params.id

  return deleteProject( projectId )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in deleteProject: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).json( { Error: error } )
    })

}

const handleGetProjectsByUserId = ( request, response ) => {
  const userId = request.params.id

  return getProjectsByUserId( userId )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        return response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in handleGetProjectsByUserId: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).json( { Error: error } )
    })
}

export {
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleDeleteProject,
  handleGetProjectsByUserId
}
