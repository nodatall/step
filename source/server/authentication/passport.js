import passport from 'passport'
import { handleAuthenticationError } from 'sym/source/errorHandling/serverErrorHandlers'
import { googlePassportStrategy } from './googleAuthentication'
import { getUserById } from '../../dataServices/database/queries'

passport.use( googlePassportStrategy )

passport.serializeUser( ( user, done ) => {
  done( null, user.id )
  return Promise.resolve()
})

passport.deserializeUser( ( userId, done ) =>
  getUserById( userId )
    .then( user => {
      done( null, user )
      return Promise.resolve()
    })
    .catch( handleAuthenticationError )
)
