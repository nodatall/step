import { expect } from 'sym/configuration/testSetup'
import { mockCouldDoData } from 'sym/source/testUtilities/mockDatabaseData'
import { withThreeCouldDos } from 'sym/source/testUtilities/testsHelper'
import { newCouldDo, editCouldDo, deleteCouldDo } from '../couldDo'
import { getCouldDoById } from '../../queries'

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
      .then( couldDo => expect( couldDo.text ).to.equal( 'eat breakfast' ) )
    )

    it( 'throws an error if given invalid attributes', () =>
      newCouldDo( data.invalidCouldDo )
        .catch( error =>
          expect( error.back().includes( 'createRecord:' ) ).to.equal( true )
        )
    )

  })

  context( 'editCouldDo()', () => {

    withThreeCouldDos( () => {

      it( 'should update couldDo with given attributes', () =>
        editCouldDo( 998, 1, data.fakeEdit )
          .then( editedCouldDo => expect( editedCouldDo.text ).to.equal( 'eat lunch' ) )
      )

      it( 'throws an error if given an invalid id', () =>
        editCouldDo( 99, 1, data.fakeEdit )
          .catch( error =>
            expect( error.back().includes( 'updateRecordWithUserID:' ) ).to.equal( true )
          )
      )

    })
  })

  context( 'deleteCouldDo()', () => {
    withThreeCouldDos( () => {

      it( 'should delete a couldDo with the given id', () =>
        deleteCouldDo( 998, 1 )
          .then( deleteConfirmaion => expect( deleteConfirmaion ).to.equal( 1 ) )
          .then( () => getCouldDoById( 998 ) )
          .catch( error =>
            expect( error.back().includes( 'getRecordById' ) ).to.equal( true )
          )
      )

      it( 'throws an error if given an invalid id', () =>
        deleteCouldDo( 917489 )
          .catch( error =>
            expect( error.back().includes( 'deleteRecordWithUserID:' ) ).to.equal( true )
          )
      )

    })

  })

})
