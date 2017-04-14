import chalk from 'chalk'
import QueueError from './QueueError'
import logger from '../server/logger'

const handleServerErrors = ( error, request, response, next ) => { //eslint-disable-line
  logger.error( chalk.yellow( error.createMessage() ) )

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

export { handleServerErrors, handleDatabaseError }
