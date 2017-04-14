import passport from 'passport'

const checkForAuthorization = ( request, response, next ) => {
  if ( request.isAuthenticated() ) {
    // Use this userId to check if user is allowed access to projects and couldDos
    request.userId = request.session.passport.user
    next()
  } else if ( process.env.NODE_ENV === 'test' ) {
    request.userId = 9000
    next()
  } else {
    response.redirect( '/' )
  }
}

const getGoogleOAuthPermissionCode = passport.authenticate(
  'google',
  { scope: [
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ],
    accessType: 'offline',
    prompt: 'consent'
  }
)

const handleSuccessfulAuthentication = ( request, response ) =>
  response.redirect( request.session.redirectTo || '/' )

const handleLogOut = ( request, response ) => {
  request.logout()
  response.redirect( '/' )
}

const handleGoogleAuthentication = passport.authenticate( 'google', { failureRedirect: '/' } ) // eslint-disable-line

const handleGetSession = ( request, response ) => {
  const userId = request.userId
  response.json({ userId })
}

export {
  checkForAuthorization,
  getGoogleOAuthPermissionCode,
  handleSuccessfulAuthentication,
  handleLogOut,
  handleGoogleAuthentication,
  handleGetSession
}
