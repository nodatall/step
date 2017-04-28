import { withThreeCouldDos } from 'sym/source/testUtilities'
import { expect } from 'sym/configuration/testSetup'
import { getCouldDoById, getCouldDosByProjectId } from '../couldDo'

describe( 'couldDo queries', () => {

  context( 'getCouldDoById', () => {

    withThreeCouldDos( () => {

      it( 'returns could-do matching given id', () =>
        getCouldDoById( 998 ).then( couldDo =>
          expect( couldDo.id ).to.equal( 998 )
        )
      )

      it( 'throws an error if id is invalid', () =>
        getCouldDoById( 18555 ).catch( error =>
          expect( error.back().includes( 'getRecordById:' ) ).to.equal( true )
        )
      )

    })

  })

  context( 'getCouldDosByProjectId', () => {

    withThreeCouldDos( () => {

      it( 'returns an array of all could-dos for supplied project id', () =>
        getCouldDosByProjectId( 1, 1 ).then( couldDos => {
          expect( couldDos.length ).to.equal( 2 )
          const couldDoIds = couldDos.map( couldDo => couldDo.id ).sort()
          expect( couldDoIds ).to.eql( [977, 998] )
        })
      )

      it( 'throws an error if given an invalid project id', () =>
        getCouldDosByProjectId( 8, 1 ).catch( error =>
          expect( error.back().includes( 'findAllWhere:' ) ).to.equal( true )
        )
      )

    })
  })

})
