import { newCouldDo, newProject, newUser } from '../dataServices/database/commands'
import { mockCouldDoData, mockProjectData, mockUserData } from './mockDatabaseTestData'

const withThreeCouldDos = callback => {
  context( 'when there are three couldDos in the database', () => {
    beforeEach( () =>
      Promise.all([
        newCouldDo(mockCouldDoData.fakeCouldDo1),
        newCouldDo(mockCouldDoData.fakeCouldDo2),
        newCouldDo(mockCouldDoData.fakeCouldDo3)
      ])
    )
    callback()
  })
}

const withThreeProjects = callback => {
  context( 'when there are three projects in the database', () => {
    beforeEach( () =>
      Promise.all([
        newProject(mockProjectData.fakeProject1),
        newProject(mockProjectData.fakeProject2),
        newProject(mockProjectData.fakeProject3)
      ])
    )
    callback()
  })
}

const withThreeUsers = callback => {
  context( 'when there are three users in the database', () => {
    beforeEach( () =>
      Promise.all([
        newUser(mockUserData.fakeUser1),
        newUser(mockUserData.fakeUser2),
        newUser(mockUserData.fakeUser3)
      ])
    )
    callback()
  })
}

export { withThreeCouldDos, withThreeProjects, withThreeUsers }
