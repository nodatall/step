import knex from 'sym/source/dataServices/database/knex'

const session = require( 'express-session' )
const KnexSessionStore = require( 'connect-session-knex' )( session )

const knexOptions = knex

const sessionStore = new KnexSessionStore({
  knex: knexOptions,
  tablename: 'sessions'
})

const expressSessionOptions = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  },
  store: sessionStore,
  resave: false,
  saveUninitialized: true
}

export default expressSessionOptions
