/* eslint-disable */

import '../../configuration/environment'
import express from 'express'
import path from 'path'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import router from './api/v1/routes'

const server = express()

server.set( 'port', process.env.PORT || '1337' )
server.use( express.static( 'public' ))

server.use( bodyParser.json() )
server.use( router )

server.get('*', ( request, response ) =>
  response.sendFile( path.join( __dirname, '/../../public/index.html' ) )
)

server.listen( server.get('port'), () =>
  console.log( chalk.magenta( '-:: Listening on port 1337 ::-' ) )
)

export default server
