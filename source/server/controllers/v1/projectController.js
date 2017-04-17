import {
  getCouldDosByProjectId,
  getProjectsByUserId
} from '../../../dataServices/database/queries'
import {
  newProject,
  editProject,
  deleteProject
} from '../../../dataServices/database/commands'
import { handleControllerError } from '../../../errorHandling/serverErrorHandlers'

const handleGetCouldDosByProjectId = ( request, response, next ) =>
  getCouldDosByProjectId( request.params.id )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleGetCouldDosByProjectId: problem getting /project/${request.params.id}/could-do` ) )
    )

const handleNewProject = ( request, response, next ) =>
  newProject( request.body )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleNewProject: problem sending ${JSON.stringify( request.body )} to /project/new` ) )
    )

const handleEditProject = ( request, response, next ) => {
  const attributes = request.body
  const projectId = request.params.id

  return editProject( projectId, attributes )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `editCouldDo: problem updating /project/edit/${projectId} with ${JSON.stringify( attributes )}` ) )
    )
}

const handleDeleteProject = ( request, response, next ) =>
  deleteProject( request.params.id )
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
  handleDeleteProject,
  handleGetProjectsByUserId
}
