import passport from 'passport'
import { googlePassportStrategy } from './googleAuthentication'
import { getUserById } from '../../dataServices/database/queries'

passport.use( googlePassportStrategy )

passport.serializeUser( ( user, done ) => done( null, user.id ) )

passport.deserializeUser( ( userId, done ) =>
  getUserById( userId ).then( user => done( null, user ) )
)
