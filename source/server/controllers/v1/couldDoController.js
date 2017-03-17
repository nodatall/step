import chalk from 'chalk'
import {
  newCouldDo,
  editCouldDo,
  deleteCouldDo
} from '../../../dataServices/database/commands/couldDo'

const handleNewCouldDo = ( request, response ) => {
  const attributes = request.body

  return newCouldDo( attributes )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in handleNewCouldDo: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).send( { Error: error } )
    })
}

const handleEditCouldDo = ( request, response ) => {
  const attributes = request.body
  const couldDoId = request.params.id

  return editCouldDo( couldDoId, attributes )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in handleEditCouldDo: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).send( { Error: error } )
    })
}

const handleDeleteCouldDo = ( request, response ) => {
  const couldDoId = request.params.id

  return deleteCouldDo( couldDoId )
    .then( result => {
      if ( result instanceof Error ) {
        throw new Error( result )
      } else {
        response.json( result )
      }
    })
    .catch( error => {
      console.log( chalk.red('There was an error in handleDeleteCouldDo: ')) // eslint-disable-line no-console
      console.trace(error) // eslint-disable-line no-console
      response.status( 400 ).send( { Error: error } )
    })
}

export {
  handleNewCouldDo,
  handleEditCouldDo,
  handleDeleteCouldDo
}
