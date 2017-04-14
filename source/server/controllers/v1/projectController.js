import {
  getCouldDosByProjectId,
  getProjectsByUserId
} from '../../../dataServices/database/queries'
import {
  newProject,
  editProject,
  deleteProject
} from '../../../dataServices/database/commands'

const handleGetCouldDosByProjectId = ( request, response, next ) =>
  getCouldDosByProjectId( request.params.id )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `handleGetCouldDosByProjectId: problem getting /project/${request.params.id}/could-do` )
      return next( error )
    })

const handleNewProject = ( request, response, next ) =>
  newProject( request.body )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `handleNewProject: problem sending ${JSON.stringify( request.body )} to /project/new` )
      return next( error )
    })

const handleEditProject = ( request, response, next ) => {
  const attributes = request.body
  const projectId = request.params.id

  return editProject( projectId, attributes )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `editCouldDo: problem updating /project/edit/${projectId} with ${JSON.stringify( attributes )}` )
      return next( error )
    })
}

const handleDeleteProject = ( request, response, next ) =>
  deleteProject( request.params.id )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `handleDeleteProject: problem deleting /project/delete/${request.params.id}` )
      return next( error )
    })

const handleGetProjectsByUserId = ( request, response, next ) =>
  getProjectsByUserId( request.params.id )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `handleGetProjectsByUserId: problem getting /user/${request.params.id}/projects` )
      return next( error )
    })

export {
  handleGetCouldDosByProjectId,
  handleNewProject,
  handleEditProject,
  handleDeleteProject,
  handleGetProjectsByUserId
}
