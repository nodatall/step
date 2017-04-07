import GoogleStrategy from 'passport-google-oauth2'
import { getUserByOAuthID } from '../../dataServices/database/queries'
import { newUser } from '../../dataServices/database/commands'
import '../../../configuration/environment'

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:1337/google/auth/callback',
  passReqToCallback: true
}

const handleUser = ( attributes, done ) => user => {
  if ( !user.length ) {
    newUser( attributes )
      .then( newAuthorizedUser => done( null, newAuthorizedUser ) )
  } else {
    done( null, user[0] )
  }
}

const handleResponse = ( request, accessToken, refreshToken, profile, done ) => {
  const { id: oauthID, email, name: { givenName: displayName } } = profile
  const created_at = new Date()
  const attributes = { oauthID, email, displayName, created_at, refreshToken }

  return getUserByOAuthID( oauthID )
    .then( handleUser( attributes, done ) )
}

const googlePassportStrategy = new GoogleStrategy( options, handleResponse )

export default googlePassportStrategy
