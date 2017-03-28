import {
  newCouldDo,
  editCouldDo,
  deleteCouldDo
} from '../../../dataServices/database/commands/couldDo'
import { handleResult, handleError } from '../../serverErrorHandler'

const handleNewCouldDo = ( request, response ) =>
  newCouldDo( request.body )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'handleNewCouldDo' ) )

const handleEditCouldDo = ( request, response ) => {
  const attributes = request.body
  const couldDoId = request.params.id

  return editCouldDo( couldDoId, attributes )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'editCouldDo' ) )
}

const handleDeleteCouldDo = ( request, response ) =>
  deleteCouldDo( request.params.id )
    .then( result => handleResult( result, response ) )
    .catch( error => handleError( error, response, 'handleDeleteCouldDo' ) )

export {
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo
}
