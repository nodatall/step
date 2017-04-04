import GoogleStrategy from 'passport-google-oauth2'
import { getUserByOAuthID } from '../../dataServices/database/queries'
import { newUser } from '../../dataServices/database/commands'
import '../../../configuration/environment'

const googlePassportStrategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:1337/google/auth/callback',
  passReqToCallback: true
},
  ( request, accessToken, refreshToken, profile, done ) =>
    getUserByOAuthID( profile.id )
      .then( user => {
        if ( !user.length ) {
          const attributes = {
            oauthID: profile.id,
            email: profile.email,
            displayName: profile.name.givenName,
            created_at: new Date(),
            refreshToken
          }

          newUser( attributes )
            .then( newAuthorizedUser => done( null, newAuthorizedUser ) )

        } else {
          done( null, user[0] )
        }
      })
  )

export default googlePassportStrategy
