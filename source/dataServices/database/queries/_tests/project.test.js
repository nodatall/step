import { expect } from '../../../../../configuration/testSetup'
import { getProjectById, getProjectsByUserId } from '../project'
import { withThreeProjects } from '../../../../testUtilities/testsHelper'

describe( 'project queries', () => {

  context( 'getProjectById()', () => {

    withThreeProjects( () => {

      it( 'returns a project with given id', () =>
        getProjectById( 77 )
          .then( project => expect( project.text ).to.equal( 'eating' ) )
      )

      it( 'should throw an error if no project exists with given id', () =>
        getProjectById( 49350 )
          .catch( error =>
            expect( error.back().includes( 'getRecordById:' ) ).to.equal( true )
          )
      )

    })

  })

  context( 'getProjectsByUserId()', () => {

    withThreeProjects( () => {

      it( 'returns an array of projects for a given user id', () =>
        getProjectsByUserId( 1 )
          .then( projects => {
            expect( projects.length ).to.equal( 2 )
            const projectNames = projects.map( project => project.text ).sort()
            expect( projectNames ).to.eql( ['eating', 'sleeping'] )
          })
      )

      it( 'throws an error if no projects associated with given user id', () =>
        getProjectsByUserId( 945 )
          .catch( error =>
            expect( error.back().includes( 'findAllWhere:' ) ).to.equal( true )
          )
      )
    })

  })

})
