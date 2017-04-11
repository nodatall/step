import { expect } from '../../../../../configuration/testSetup'
import { getUserById } from '../'
import { withThreeUsers } from '../../../../testUtilities/testsHelper'

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
        getUserById( 999 )
          .then( error => expect( error ).to.be.instanceof( Error ) )
      )

    })
  })
})
