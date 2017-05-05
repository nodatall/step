import { handleControllerError } from 'sym/source/errorHandling/serverErrorHandlers'
import {
  getCouldDosByProjectId,
  getProjectsByUserId
} from '../../../dataServices/database/queries'
import {
  newProject,
  editProject,
  deleteProject,
  orderProjects
} from '../../../dataServices/database/commands'

const handleGetCouldDosByProjectId = ( request, response, next ) =>
   getCouldDosByProjectId( request.params.id, request.userId )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleGetCouldDosByProjectId: problem getting /project/${request.params.id}/could-do` ) )
    )

const handleNewProject = ( request, response, next ) => {
  request.body.user_id = request.userId

  return newProject( request.body )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleNewProject: problem sending ${JSON.stringify( request.body )} to /project/new` ) )
    )
}

const handleEditProject = ( request, response, next ) => {
  const { body: attributes, params: { id: projectId }, userId } = request

  return editProject( projectId, userId, attributes )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `editProject: problem updating /project/edit/${projectId} with ${JSON.stringify( attributes )}` ) )
    )
}

const handleOrderProject = ( request, response, next ) => {
  const { body: attributes, userId: user_id } = request

  return orderProjects( user_id, attributes )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `orderProject: problem updating /project/order with ${JSON.stringify( attributes )}` ) )
    )
}

const handleDeleteProject = ( request, response, next ) =>
  deleteProject( request.params.id, request.userId )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleDeleteProject: problem deleting /project/delete/${request.params.id}` ) )
    )

const handleGetProjectsByUserId = ( request, response, next ) =>
  getProjectsByUserId( request.params.id )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleGetProjectsByUserId: problem getting /user/${request.params.id}/projects` ) )
    )

export {
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleOrderProject,
  handleDeleteProject,
  handleGetProjectsByUserId
}
