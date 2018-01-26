/* eslint-disable */

const globalStateHelpers = stateStorage => ({

  updateProjectText( projectId, text ) {
    stateStorage.projects[projectId].text = text
    this.passStateToSubscribers()
  },

  updateCouldDoText( couldDoId, text ) {
    stateStorage.projects[stateStorage.currentProjectId].couldDos[couldDoId].text = text
    this.passStateToSubscribers()
  },
  
  completeCouldDo( couldDoId ) {
    delete stateStorage.projects[stateStorage.currentProjectId].couldDos[couldDoId]
    this.passStateToSubscribers()
  },

  updateProjects( projects ) {
    for ( let projectKey in stateStorage.projects ) {
      const newOrder = projects.filter( project => project.id === projectKey )[0].order
      stateStorage.projects[projectKey].order = newOrder
    }
    this.passStateToSubscribers()
  },

  updateCouldDos( couldDos ) {
    for ( let couldDoKey in stateStorage.projects[stateStorage.currentProjectId].couldDos ) {
      const newOrder = couldDos.filter( couldDo => couldDo.id === couldDoKey )[0].order
      stateStorage.projects[stateStorage.currentProjectId].couldDos[couldDoKey].order = newOrder
    }
    this.passStateToSubscribers()
  },

  addProject( newProject ) {
    newProject.couldDos = []
    stateStorage.projects[newProject.id] = newProject
    this.passStateToSubscribers()
  },

  addCouldDo( newCouldDo ) {
    stateStorage.projects[newCouldDo.project_id].couldDos[newCouldDo.id] = newCouldDo
    this.passStateToSubscribers()
  },

  deleteProject( projectId ) {
    delete stateStorage.projects[projectId]
    this.passStateToSubscribers()
  },

  deleteCouldDo( couldDoId ) {
    delete stateStorage.projects[stateStorage.currentProjectId].couldDos[couldDoId]
    this.passStateToSubscribers()
  },

  setCurrentProjectId( projectId ) {
    stateStorage.currentProjectId = projectId
    this.passStateToSubscribers()
  },

})

export default globalStateHelpers
