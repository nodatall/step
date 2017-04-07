/* eslint-disable */
import '../../configuration/environment'
import './authentication'
import express from 'express'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import router from './api/v1/routes'
import passport from 'passport'
import logger from 'morgan'

const server = express()

if (process.env.NODE_ENV !== 'test') server.use( logger( 'dev' ) )

server.set( 'port', process.env.PORT || '1337' )
server.use( express.static( 'public' ))
server.use( bodyParser.json() )
server.use( passport.initialize() )

server.use( router )

server.listen( server.get('port'), () =>
  console.log( chalk.magenta( '\n -:: Server listening on port 1337 ::-' ) )
)

export default server
