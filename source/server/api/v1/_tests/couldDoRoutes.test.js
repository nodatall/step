/* eslint-disable */
import { expect, chai } from '../../../../../configuration/testSetup'
import server from '../../../server'
import { withThreeCouldDos } from '../../../../dataServices/database/testsHelper'

describe( 'couldDo routes', () => {

  context( '/could-do/new', () => {

    it( 'should return created couldDo', () =>
      chai.request( server )
        .post( '/could-do/new' )
        .send({ text: 'quit coffee', user_id: 1, project_id: 1 })
        .then( response => expect( response.body.text ).to.equal( 'quit coffee' ) )
    )

    it( 'should throw an error if supplied invalid attributes', () =>
      chai.request( server )
        .post( '/could-do/new' )
        .send({ backpain: 'not rad', user_id: 'ten thousand' })
        .catch( error => expect( error ).to.be.an.instanceof( Error ))
    )

  })

  context( '/could-do/edit/:id', () => {

    withThreeCouldDos( () => {

      it( 'should return the edited couldDo', () =>
        chai.request( server )
          .post( '/could-do/edit/998' )
          .send({ text: 'eat lunch' })
          .then( response => expect( response.body.text ).to.equal( 'eat lunch' ))
      )

      it( 'should throw an error if no couldDo with given id is found', () =>
        chai.request( server )
          .post( '/could-do/edit/12345' )
          .send({ text: 'eat lunch' })
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

      it( 'should throw an error if given invalid attributes', () =>
        chai.request( server )
          .post( '/could-do/edit/998' )
          .send({ backpain: 'not rad', user_id: 'ten thousand' })
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

    })
  })

  context( '/could-do/delete/:id', () => {

    withThreeCouldDos( () => {

      it( 'should return 1 after deleting one item', () =>
        chai.request( server )
          .post( '/could-do/delete/998' )
          .then( response => expect( response.body ).to.equal( 1 ))
      )

      it( 'should throw an error if no couldDo with given id is found', () =>
        chai.request( server )
          .post( '/could-do/delete/12345' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ))
      )

    })

  })

})
