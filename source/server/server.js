/* eslint-disable */
import '../../configuration/environment'
import express from 'express'
import chalk from 'chalk'
import bodyParser from 'body-parser'
import router from './api/v1/routes'
import passport from 'passport'
import morgan from 'morgan'
import googlePassportStrategy from './oauth'

const server = express()

server.use( morgan('dev') )

server.set( 'port', process.env.PORT || '1337' )
server.use( express.static( 'public' ))
server.use( bodyParser.json() )

passport.use( googlePassportStrategy )
server.use( passport.initialize() )
passport.serializeUser( ( user, done ) => done( null, user ) )
passport.deserializeUser( ( obj, done ) => done( null, obj ) )

server.use( router )

server.listen( server.get('port'), () =>
  console.log( chalk.magenta( '\n -:: Server listening on port 1337 ::-' ) )
)

export default server
