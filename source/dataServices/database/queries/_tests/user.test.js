import { expect } from 'sym/configuration/testSetup'
import { getUserById, getUserByOAuthID } from '../'
import { withThreeUsers } from 'sym/source/testUtilities'

describe( 'user queries', () => {

  context( 'getUserById()', () => {

    withThreeUsers( () => {

      it( 'should return the user with given id', () =>
        getUserById( 88 )
          .then( user => {
            expect( user.display_name ).to.equal( 'Steve' )
            expect( user.email ).to.equal( 'steve@weber.com' )
          })
      )

      it( 'should throw an error if no user exists with given id', () =>
        getUserById( 999 ).catch( error =>
          expect( error.back().includes( 'getRecordById:' ) ).to.equal( true )
        )
      )

    })

  })

  context( 'getUserByOAuthIDId()', () => {

    withThreeUsers( () => {

      it( 'should return the user with given oauth_ID', () =>
        getUserByOAuthID( 123456789 )
          .then( user => {
            expect( user.display_name ).to.equal( 'John' )
            expect( user.email ).to.equal( 'john@hallman.com' )
          })
      )

      it( 'should throw an error if no user exists with given id', () =>
        getUserByOAuthID( 1337 ).catch( error =>
          expect( error.back().includes( 'getRecordById:' ) ).to.equal( true )
        )
      )

    })

  })

})
