const componentErrorHandler = componentName => error => {
  console.error( 'Message: Error occured in ', componentName ) // eslint-disable-line
  console.error( error ) // eslint-disable-line
}

export default componentErrorHandler
