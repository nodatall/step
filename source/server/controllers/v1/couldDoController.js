import { handleControllerError } from 'sym/source/errorHandling/serverErrorHandlers'
import {
  newCouldDo,
  editCouldDo,
  deleteCouldDo,
  orderCouldDos
} from '../../../dataServices/database/commands'

const handleNewCouldDo = ( request, response, next ) => {
  request.body.user_id = request.userId
  return newCouldDo( request.body )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleNewCouldDo: problem sending ${JSON.stringify( request.body )} to /could-do/new` ) )
    )
}

const handleEditCouldDo = ( request, response, next ) => {
  const { body: attributes, params: { id: couldDoId }, userId } = request

  return editCouldDo( couldDoId, userId, attributes )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `editCouldDo: problem updating /could-do/edit/${couldDoId} with ${JSON.stringify( attributes )}` ) )
    )
}

const handleOrderCouldDo = ( request, response, next ) => {
  const { body: attributes, userId: user_id } = request

  return orderCouldDos( user_id, attributes )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `orderCouldDo: problem updating /could-do/order with ${JSON.stringify( attributes )}` ) )
    )
}

const handleDeleteCouldDo = ( request, response, next ) =>
  deleteCouldDo( request.params.id, request.userId )
    .then( result => response.json( result ) )
    .catch( error =>
      next( handleControllerError( error, `handleDeleteCouldDo: problem deleting /could-do/delete/${request.params.id}` ) )
    )

export {
  handleNewCouldDo,
  handleEditCouldDo,
  handleOrderCouldDo,
  handleDeleteCouldDo
}
