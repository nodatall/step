import { expect } from 'sym/configuration/testSetup'
import { mockProjectData, withThreeProjects, createDeepClone } from 'sym/source/testUtilities'
import { newProject, editProject, orderProjects, deleteProject } from '../project'
import { getProjectById, getProjectsByUserId } from '../../queries'

const data = mockProjectData

describe( 'project commands', () => {

  context( 'newProject()', () => {

    it( 'creates a project with the given id and name', () => {
      delete data.fakeProject1.couldDos
      return newProject( data.fakeProject1 )
        .then( project => {
          expect( project.text ).to.equal( 'eating' )
          return project.id
        })
        .then( getProjectById )
        .then( project => expect( project.text ).to.equal( 'eating' ) )
    })

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
        editProject( 77, 1, data.fakeEdit )
          .then( project => expect( project.text ).to.equal( 'snoozing' ) )
      )

      it( 'should throw an error if given an invalid project id', () =>
        editProject( 49683, 1, data.fakeEdit )
          .catch( error =>
            expect( error.back().includes( 'updateRecordWithUserID:' ) ).to.equal( true )
          )
      )

    })

  })

  context( 'deleteProject()', () => {

    withThreeProjects( () => {

      it( 'should delete a project with the given id', () =>
        deleteProject( 77, 1 )
          .then( deleteCount => expect( deleteCount ).to.equal( 1 ) )
          .then( () => getProjectById( 77, 1 ) )
          .catch( error =>
            expect( error.back().includes( 'getRecordById:' ) ).to.equal( true )
          )
      )

      it( 'should throw an error if no project exists with given id', () =>
        deleteProject( 94035, 1 )
          .catch( error =>
            expect( error.back().includes( 'deleteRecordWithUserID' ) ).to.equal( true )
          )
      )

    })

  })

  context( 'orderProjects()', () => {

    withThreeProjects( () => {
      const projectsToOrder = createDeepClone( mockProjectData )
      const orderedProjects = []
      Object.keys( projectsToOrder ).forEach( ( key, index ) => {
        projectsToOrder[key].order = index + 5
        if ( index < 2 ) {
          delete projectsToOrder[key].text
          orderedProjects.push( projectsToOrder[key] )
        }
      })

      it( 'should update the order of all projects', () =>
        orderProjects( 1, orderedProjects )
          .then( updatedProjects => {
            expect( updatedProjects.rowCount ).to.equal( 2 )
            return getProjectsByUserId( 1 )
          })
          .then( projects => {
            expect( projects[0].order ).to.equal( 5 )
            expect( projects[1].order ).to.equal( 6 )
          })
      )

      it( 'throw an error if given invalid project data', () =>
        orderProjects( 1, data.invalidProject )
        .catch( error =>
          expect( error.back().includes( 'updateOrderWithUserId:' ) ).to.equal( true )
        )
      )

    })

  })

})
