import { expect } from '../../../../../configuration/testSetup'
import { newProject, editProject, deleteProject } from '../project'
import { getProjectById } from '../../queries'
import { mockProjectData } from '../../../../testUtilities/mockDatabaseTestData'
import { withThreeProjects } from '../../../../testUtilities/testsHelper'

const data = mockProjectData

describe( 'project commands', () => {

  context( 'newProject()', () => {

    it( 'creates a project with the given id and name', () =>
      newProject( data.fakeProject1 )
        .then( project => {
          expect( project.text ).to.equal( 'eating' )
          return project.id
        })
        .then( getProjectById )
        .then( project => expect( project.text ).to.equal( 'eating' ) )
    )

    it( 'throws an error if given invalid attributes', () =>
      newProject( data.invalidProject )
        .catch( error =>
          expect( error.back().includes( 'createRecord:' ) ).to.equal( true )
        )
    )

  })

  context( 'editProject()', () => {

    withThreeProjects( () => {

      it( 'should update project with given attributes', () =>
        editProject( 77, data.fakeEdit )
          .then( project => expect( project.text ).to.equal( 'snoozing' ) )
      )

      it( 'should throw an error if given an invalid project id', () =>
        editProject( 49683, data.fakeEdit )
          .catch( error =>
            expect( error.back().includes( 'updateRecord:' ) ).to.equal( true )
          )
      )

    })

  })

  context( 'deleteProject()', () => {

    withThreeProjects( () => {

      it( 'should delete a project with the given id', () =>
        deleteProject( 77 )
          .then( deleteCount => expect( deleteCount ).to.equal( 1 ) )
          .then( () => getProjectById( 77 ) )
          .catch( error =>
            expect( error.back().includes( 'getRecordById:' ) ).to.equal( true )
          )
      )

      it( 'should throw an error if no project exists with given id', () =>
        deleteProject( 94035 )
          .catch( error =>
            expect( error.back().includes( 'deleteRecord' ) ).to.equal( true )
          )
      )

    })

  })

})
