import passport from 'passport'
import googlePassportStrategy from './googleAuthentication'

passport.use( googlePassportStrategy )
passport.serializeUser( ( user, done ) => done( null, user ) )
passport.deserializeUser( ( obj, done ) => done( null, obj ) )
