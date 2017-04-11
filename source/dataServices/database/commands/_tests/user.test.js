import { expect } from '../../../../../configuration/testSetup'
import { newUser, editUser, deleteUser } from '../user'
import { getUserById } from '../../queries'
import { mockUserData } from '../../../../testUtilities/mockDatabaseTestData'
import { withThreeUsers } from '../../../../testUtilities/testsHelper'

const data = mockUserData

describe( 'user commands', () => {

  context( 'newUser()', () => {

    it( 'creates a user with the given email, displayName, oauthID, and refreshToken', () =>
      newUser( data.fakeUser1 )
        .then( user => {
          expect( user.email ).to.equal( 'john@hallman.com' )
          expect( user.display_name ).to.equal( 'John' )
          expect( user.created_at ).to.be.instanceof( Date )
        })
    )

    it( 'throws an error if given invalid attributes', () =>
      newUser( data.invalidUser )
        .then( error =>
          expect( error ).to.be.instanceof( Error )
        )
    )
  })

  context( 'editUser()', () => {

    withThreeUsers( () => {

      it( 'should update a user with given attributes', () =>
        editUser( 99, data.fakeEdit )
          .then( editedUser =>
            expect( editedUser.display_name ).to.equal( 'Batman' ) )
      )

      it( 'should throw an error if given an invalid user id', () =>
        editUser( 2, data.fakeEdit )
          .then( error => expect( error ).to.be.instanceof( Error )
          )
      )
    })
  })

  context( 'deleteUser()', () => {

    withThreeUsers( () => {

      it( 'should deleted a user with the given id', () =>
        deleteUser( 88 )
          .then( deleteCount => expect( deleteCount ).to.equal( 1 ) )
          .then( () => getUserById( 88 ) )
          .then( error => expect( error ).to.be.instanceof( Error ) )
      )

      it( 'should throw an error if no user exists with given id', () =>
        deleteUser( 999 )
          .then( error => expect( error ).to.be.instanceof( Error ) )
      )
    })
  })
})
