const checkforValidEnv = () => {

  const throwEnvError = envType => {
    throw new Error( `Make sure you have ${envType} in your .env file` )
  }

  if ( !process.env.GOOGLE_CLIENT_ID ) {
    throwEnvError( 'GOOGLE_CLIENT_ID' )
  } else if ( !process.env.CLIENT_SECRET ) {
    throwEnvError( 'CLIENT_SECRET' )
  } else if ( !process.env.CALLBACK_URL ) {
    throwEnvError( 'CALLBACK_URL' )
  }

}

export default checkforValidEnv
