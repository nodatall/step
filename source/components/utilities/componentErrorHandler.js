const componentErrorHandler = componentName => error => {
  console.warn( 'Message: Error occured in ', componentName ) // eslint-disable-line
  console.warn( error ) // eslint-disable-line
}

export default componentErrorHandler
