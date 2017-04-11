import sinon from 'sinon'
import { expect } from '../../../../configuration/testSetup'
import { handleUser } from '../googleAuthentication'
import { mockUserData } from '../../../testUtilities/mockDatabaseTestData'

describe( 'google authentication handlers', () => {

  context( 'handeUser()', () => {
    let addUserStub, noNewUserStub
    const { fakeGoogleProfile, fakeUser1 } = mockUserData, noUser = []

    const doneStubber = {
      addUser: () => null,
      noNewUser: () => null
    }

    const fakeDone = ( _, user ) => (
      user.id === 1 ? doneStubber.addUser() : doneStubber.noNewUser()
    )

    const callHandleUser = ( user, attributes ) => Promise.resolve( user )
        .then( handleUser( attributes, fakeDone ) )

    beforeEach( () => {
      addUserStub = sinon.stub( doneStubber, 'addUser' )
      noNewUserStub = sinon.stub( doneStubber, 'noNewUser' )
    })

    afterEach( () => {
      addUserStub.restore()
      noNewUserStub.restore()
    })

    it( 'adds a new user if no user supplied', () =>
      callHandleUser( noUser, fakeGoogleProfile ).then( () => {
        expect( addUserStub.calledOnce ).to.equal( true )
        expect( noNewUserStub.calledOnce ).to.equal( false )
      })
    )

    it( 'uses existing supplied user', () =>
      callHandleUser( [fakeUser1], fakeGoogleProfile ).then( () => {
        expect( noNewUserStub.calledOnce ).to.equal( true )
        expect( addUserStub.calledOnce ).to.equal( false )
      })
    )

  })

})
