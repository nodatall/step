import { handleControllerError } from 'sym/source/errorHandling/serverErrorHandlers'
import {
  newCouldDo,
  editCouldDo,
  deleteCouldDo
} from '../../../dataServices/database/commands'

const handleNewCouldDo = ( request, response, next ) =>
  newCouldDo( request.body )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleNewCouldDo: problem sending ${JSON.stringify( request.body )} to /could-do/new` ) )
    )

const handleEditCouldDo = ( request, response, next ) => {
  const attributes = request.body
  const couldDoId = request.params.id

  return editCouldDo( couldDoId, attributes )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `editCouldDo: problem updating /could-do/edit/${couldDoId} with ${JSON.stringify( attributes )}` ) )
    )
}

const handleDeleteCouldDo = ( request, response, next ) =>
  deleteCouldDo( request.params.id )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleDeleteCouldDo: problem deleting /could-do/delete/${request.params.id}` ) )
    )

export {
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo
}
