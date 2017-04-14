import { expect, chai } from '../../../../../configuration/testSetup'
import server from '../../../server'

describe( 'authentication', () => {

  context( '/login', () => {

    it( 'response should redirect', () =>
      chai.request( server )
        .get( '/auth/google' )
        .redirects( 0 )
        .then( Promise.reject )
        .catch( ({ response }) => {
          const redirectString = response.headers.location
          const matchRedirect = /^https:\/\/accounts\.google\.com\/o\/oauth2\/auth/.test( redirectString )
          expect( matchRedirect ).to.be.true //eslint-disable-line
          expect( response.status ).to.equal( 302 )
        })
    )
  })

  context( '/session', () => {
    it( 'session', () =>
      chai.request( server )
        .get( '/session' )
        .then( response => {
          expect(response.body.userId).to.be.eql(9000)
        })
    )

  })
})
