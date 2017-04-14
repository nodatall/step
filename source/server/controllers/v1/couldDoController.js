import {
  newCouldDo,
  editCouldDo,
  deleteCouldDo
} from '../../../dataServices/database/commands'

const handleNewCouldDo = ( request, response, next ) =>
  newCouldDo( request.body )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `handleNewCouldDo: problem sending ${JSON.stringify( request.body )} to /could-do/new` )
      return next( error )
    })

const handleEditCouldDo = ( request, response, next ) => {
  const attributes = request.body
  const couldDoId = request.params.id

  return editCouldDo( couldDoId, attributes )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `editCouldDo: problem updating /could-do/edit/${couldDoId} with ${JSON.stringify( attributes )}` )
      return next( error )
    })
}

const handleDeleteCouldDo = ( request, response, next ) =>
  deleteCouldDo( request.params.id )
    .then( result => response.json( result ) )
    .catch( error => {
      error.enqueue( `handleDeleteCouldDo: problem deleting /could-do/delete/${request.params.id}` )
      return next( error )
    })

export {
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo
}
