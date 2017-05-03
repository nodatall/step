/* eslint-disable */ 

const globalStateHelpers = stateStorage => ({

  updateProjectText( projectId, text ) {
    stateStorage.projects[projectId].text = text
    this.passStateToSubscribers()
  },

  updateCouldDoText( projectId, couldDoId, text ) {
    stateStorage.projects[projectId].couldDos[couldDoId].text = text
    this.passStateToSubscribers()
  },

  addProject( newProject ) {
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
