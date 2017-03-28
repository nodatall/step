import {
  getCouldDosByProjectId
} from '../../../dataServices/database/queries/couldDo'
import {
  newProject,
  editProject,
  deleteProject
} from '../../../dataServices/database/commands/project'
import { getProjectsByUserId } from '../../../dataServices/database/queries/project'
import { handleResult, handleError } from '../../serverErrorHandler'

const handleGetCouldDosByProjectId = ( request, response ) =>
  getCouldDosByProjectId( request.params.id )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'handleGetCouldDosByProjectId' ) )

const handleNewProject = ( request, response ) =>
  newProject( request.body )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'handleNewProject' ) )

const handleEditProject = ( request, response ) => {
  const attributes = request.body
  const projectId = request.params.id

  return editProject( projectId, attributes )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'editProject' ) )
}

const handleDeleteProject = ( request, response ) =>
  deleteProject( request.params.id )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'handleDeleteProject' ) )

const handleGetProjectsByUserId = ( request, response ) =>
  getProjectsByUserId( request.params.id )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'handleGetProjectsByUserId' ) )

export {
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleDeleteProject,
  handleGetProjectsByUserId
}
