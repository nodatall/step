import { expect, chai } from '../../../../../configuration/testSetup'
import server from '../../../server'

describe( 'passportOAuth', () => {
  context( '/auth/google', () => {
    it( 'should have a success status code (200)', () =>
      chai.request( server )
      .get('/auth/google')
      .then( ( response ) => {
        expect( response ).to.have.status( 200 )
      })
      .catch( error => error )
    )
  })
})
