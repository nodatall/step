import { expect } from '../../../../../configuration/testSetup'
import { newCouldDo, editCouldDo, deleteCouldDo } from '../couldDo'
import { getCouldDoById } from '../../queries/couldDo'
import { mockCouldDoData } from '../../../../testUtilities/mockDatabaseTestData'
import { withThreeCouldDos } from '../../../../testUtilities/testsHelper'

const data = mockCouldDoData

describe( 'couldDo commands', () => {

  context( 'newCouldDo()', () => {

    it( 'returns created could-do', () =>
      newCouldDo( data.fakeCouldDo1 )
        .then( couldDo => {
          expect( couldDo ).to.be.an( 'object' )
          expect( couldDo.text ).to.equal( 'eat breakfast' )
          return couldDo.id
        })
        .then( getCouldDoById )
        .then( couldDo => expect( couldDo.text ).to.equal( 'eat breakfast' ))
    )

    it( 'throws an error if given invalid attributes', () =>
      newCouldDo( data.invalidCouldDo )
        .then( error => expect( error ).to.be.an.instanceof( Error ) )
    )

  })

  context( 'editCouldDo()', () => {

    withThreeCouldDos( () => {

      it( 'should update couldDo with given attributes', () =>
        editCouldDo( 998, data.fakeEdit)
          .then( editedCouldDo => expect( editedCouldDo.text ).to.equal( 'eat lunch' ) )
      )

      it( 'throws an error if given an invalid id', () =>
        editCouldDo( 99, data.fakeEdit )
          .then( error => expect( error ).to.be.an.instanceof( Error )
        )
      )

    })
  })

  context( 'deleteCouldDo()', () => {
    withThreeCouldDos( () => {

      it( 'should delete a couldDo with the given id', () =>
        deleteCouldDo( 998 )
          .then( deleteConfirmaion => expect(deleteConfirmaion).to.equal( 1 ) )
          .then( () => getCouldDoById( 998 ) )
          .then( error => expect( error ).to.be.an.instanceof( Error ))
      )

      it( 'throws an error if given an invalid id', () =>
        deleteCouldDo( 917489 )
          .then( error => expect( error ).to.be.an.instanceof( Error )
        )
      )

    })

  })

})
