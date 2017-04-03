import path from 'path'

const handleSendApp = ( request, response ) =>
  response.sendFile( path.join( __dirname, '/../../public/index.html' ) )

export { handleSendApp } // eslint-disable-line
