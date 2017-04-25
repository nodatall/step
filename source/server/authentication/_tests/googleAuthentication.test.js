import sinon from 'sinon'
import { expect } from 'sym/configuration/testSetup'
import { mockUserData } from 'sym/source/testUtilities'
import { handleResponse } from '../googleAuthentication'

describe( 'google authentication handlers', () => {

  context( 'handleResponse()', () => {
    let addUserSpy, noNewUserSpy
    const { googleResponse: { request, accessToken, refresh_token, profile } } = mockUserData

    const fakeDone = ( _, user ) => (
        user.oauth_ID !== '8' ? addUserSpy() : noNewUserSpy()
      )

    beforeEach( () => {
      addUserSpy = sinon.spy()
      noNewUserSpy = sinon.spy()
    })

    it( 'adds a new user if no user exists with profile', () =>
      handleResponse( request, accessToken, refresh_token, profile, fakeDone )
        .then( () => {
          expect( addUserSpy.calledOnce ).to.equal( true )
          expect( noNewUserSpy.calledOnce ).to.equal( false )
        })
    )

    it( 'uses existing supplied user', () => {
      profile.id = 8
      return handleResponse( request, accessToken, refresh_token, profile, fakeDone )
        .then( () => {
          expect( noNewUserSpy.calledOnce ).to.equal( true )
          expect( addUserSpy.calledTwice ).to.equal( false )
        })
    })

  })

})
