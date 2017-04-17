import sinon from 'sinon'
import { expect } from 'sym/configuration/testSetup'
import { mockUserData } from 'sym/source/testUtilities/mockDatabaseTestData'
import { handleResponse } from '../googleAuthentication'

describe( 'google authentication handlers', () => {

  context( 'handleResponse()', () => {
    let addUserStub, noNewUserStub
    const { googleResponse: { request, accessToken, refresh_token, profile } } = mockUserData

    const doneStubber = {
      addUser: () => null,
      noNewUser: () => null
    }

    const fakeDone = ( _, user ) => (
      user.id === 1 ? doneStubber.addUser() : doneStubber.noNewUser()
    )

    beforeEach( () => {
      addUserStub = sinon.stub( doneStubber, 'addUser' )
      noNewUserStub = sinon.stub( doneStubber, 'noNewUser' )
    })

    afterEach( () => {
      addUserStub.restore()
      noNewUserStub.restore()
    })

    it( 'adds a new user if no user exists with profile', () =>
      handleResponse( request, accessToken, refresh_token, profile, fakeDone )
        .then( () => {
          expect( addUserStub.calledOnce ).to.equal( true )
          expect( noNewUserStub.calledOnce ).to.equal( false )
        })
    )

    it( 'uses existing supplied user', () => {
      profile.id = 8
      handleResponse( request, accessToken, refresh_token, profile, fakeDone )
        .then( () => {
          expect( noNewUserStub.calledOnce ).to.equal( true )
          expect( addUserStub.calledOnce ).to.equal( false )
        })
    })

  })

})
