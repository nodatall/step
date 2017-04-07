import path from 'path'

const handleSendApp = ( request, response ) => {
  const publicPath = path.resolve( __dirname, '../../../../public' )
  response.sendFile( ( `${publicPath}/index.html` ) )
}

export default handleSendApp
