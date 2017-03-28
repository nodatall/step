import chalk from 'chalk'

const handleResult = ( result, response ) => {
  if ( result instanceof Error ) {
    throw new Error( result )
  } else {
    return response.json( result )
  }
}

const handleError = ( error, response, name ) => {
  console.log( chalk.red( `There was an error in ${name}: ` )) // eslint-disable-line no-console
  console.trace( error ) // eslint-disable-line no-console
  response.status( 400 ).json( { Error: error } )
}

export { handleResult, handleError }
