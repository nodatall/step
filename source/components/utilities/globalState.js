const stateStorage = {}

const globalState = {

  subscribers: [],

  set( stateUpdates ) {
    Object.assign( stateStorage, stateUpdates )
    this.passStateToSubscribers()
  },

  get() { return stateStorage },

  reset() {
    for ( const property in stateStorage ) {
      delete stateStorage[property]
    }
    this.passStateToSubscribers()
  },

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

  setCurrentProjectId( projectId ) {
    stateStorage.currentProjectId = projectId
    this.passStateToSubscribers()
  },

  subscribe( subscriber ) {
    this.subscribers.push( subscriber )
  },

  unsubscribe( subscriber ) {
    this.subscribers = this.subscribers
      .filter( sub => sub !== subscriber )
  },

  passStateToSubscribers() {
    if ( this.scheduledTrigger ) {
      return
    }
    this.scheduledTrigger = setTimeout( () => {
      delete this.scheduledTrigger
      this.subscribers.forEach( subscriber => {
        subscriber( stateStorage )
      })
    })
  }
}

export default globalState
