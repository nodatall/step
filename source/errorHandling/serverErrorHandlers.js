import chalk from 'chalk'
import QueueError from './QueueError'
import logger from '../server/logger'

const handleUnhandledRejection = () => {
  process.on( 'unhandledRejection', ( reason, promise ) => {
    console.error( chalk.yellow( '\n--:: Unhandled promise rejection ::--\n' ) ) // eslint-disable-line
    console.error( chalk.yellow( 'Stack trace:' ), reason ) // eslint-disable-line
    console.error( chalk.yellow( '\nUnhandled promise:' ), promise ) // eslint-disable-line
  })
}

const handleServerErrors = ( error, request, response, next ) => { // eslint-disable-line
  if ( !process.env.NODE_ENV === 'test' ) handleUnhandledRejection()
  
  logger.error( `\n${chalk.yellow( error.createMessage() )}` )
  
  response.status( error.status || 500 )
  
  if ( process.env.NODE_ENV === 'development' ) {
    response.json({
      message: error.createMessage(),
      stack: error.stack
    })
  } else {
    response.json({
      message: error.createMessage()
    })
  }
}

const handleDatabaseError = ( error, message ) => {
  if ( !error.enqueue ) {
    throw new QueueError( message )
  } else {
    error.enqueue( message )
    throw error
  }
}

const handleControllerError = ( error, message ) => {
  if ( !error.enqueue ) {
    return new QueueError( message )
  } else {
    error.enqueue( message )
    return error
  }
}

const handleAuthenticationError = error => {
  logger.error( chalk.yellow( error.createMessage() ) )
  logger.warn( error.stack )
}

export {
  handleServerErrors,
  handleDatabaseError,
  handleControllerError,
  handleAuthenticationError,
  handleUnhandledRejection
}
