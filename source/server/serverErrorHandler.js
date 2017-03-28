import logger from './logger'

const handleResult = ( result, response ) => {
  if ( result instanceof Error ) {
    throw result
  } else {
    return response.json( result )
  }
}

const handleError = ( error, response, name ) => {
  logger.error( `in ${name}: ${error}` )
  response.status( 400 ).json( error )
}

export { handleResult, handleError }
