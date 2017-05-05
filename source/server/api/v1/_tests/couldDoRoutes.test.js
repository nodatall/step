import { expect, chai } from 'sym/configuration/testSetup'
import { mockCouldDoData, withThreeCouldDos } from 'sym/source/testUtilities'
import server from '../../../server'

describe( 'couldDo routes', () => {

  context( '/could-do/new', () => {

    it( 'should return created couldDo', () =>
      chai.request( server )
        .post( '/could-do/new' )
        .send( mockCouldDoData.fakeCouldDo2 )
        .then( response => expect( response.body.text ).to.equal( 'eat zero sugar' ) )
    )

    it( 'should throw an error if supplied invalid attributes', () =>
      chai.request( server )
        .post( '/could-do/new' )
        .send( mockCouldDoData.invalidCouldDo )
        .catch( error => {
          expect( error ).to.be.an.instanceof( Error )
        })
    )

  })

  context( '/could-do/edit/:id', () => {

    withThreeCouldDos( () => {

      it( 'should return the edited couldDo', () =>
        chai.request( server )
          .post( '/could-do/edit/998' )
          .send( mockCouldDoData.fakeEdit )
          .then( response => expect( response.body.text ).to.equal( 'eat lunch' ) )
      )

      it( 'should throw an error if no couldDo with given id is found', () =>
        chai.request( server )
          .post( '/could-do/edit/12345' )
          .send( mockCouldDoData.fakeEdit )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

      it( 'should throw an error if given invalid attributes', () =>
        chai.request( server )
          .post( '/could-do/edit/998' )
          .send( mockCouldDoData.invalidCouldDo )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

    })
  })

  context( '/could-do/delete/:id', () => {

    withThreeCouldDos( () => {

      it( 'should return 1 after deleting one item', () =>
        chai.request( server )
          .post( '/could-do/delete/998' )
          .then( response => expect( response.body ).to.equal( 1 ) )
      )

      it( 'should throw an error if no couldDo with given id is found', () =>
        chai.request( server )
          .post( '/could-do/delete/12345' )
          .catch( error => expect( error ).to.be.an.instanceof( Error ) )
      )

    })

  })

  context( '/could-do/order', () => {
    const couldDosWithNewOrder = []
    Object.keys( mockCouldDoData ).forEach( ( key, index ) => {
      if ( index < 2 ) {
        mockCouldDoData[key].order = index + 35
        couldDosWithNewOrder.push( mockCouldDoData[key] )
      }
    })

    withThreeCouldDos( () => {

      it( 'should update order of couldDos', () =>
        chai.request( server )
          .post( '/could-do/order' )
          .send( couldDosWithNewOrder )
          .then( ({ body: { rowCount } }) => {
            expect( rowCount ).to.equal( 2 )
          })
      )

    })

  })

})
