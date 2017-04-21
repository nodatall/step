const mockGlobalStateCouldDos = {
  1: {
    id: 1,
    text: 'give unsolicited advice to people',
  },
  2: {
    id: 2,
    text: 'make a painting',
  },
  3: {
    id: 3,
    text: 'sculpt creature from super sculpy',
  },
}

const mockGlobalStateProjects = {
  1: {
    id: 1,
    text: 'learn to chortle',
    couldDos: mockGlobalStateCouldDos
  },
  2: {
    id: 2,
    text: 'learn to be creative while fearing for your livelihood',
    couldDos: mockGlobalStateCouldDos
  },
  3: {
    id: 3,
    text: 'enter the danger zone',
    couldDos: mockGlobalStateCouldDos
  },
  4: {
    id: 4,
    text: 'break into someone\'s house and organize thier stuff',
    couldDos: mockGlobalStateCouldDos
  }
}

const mockGlobalState = {
  userId: 1,
  currentProjectId: 2,
  projects: mockGlobalStateProjects,
  currentCouldDoIndex: 0
}

const mockProjects = [
  {
    id: 1,
    text: 'learn to chortle',
    couldDos: mockGlobalStateCouldDos
  },
  {
    id: 2,
    text: 'learn to be creative while fearing for your livelihood',
    couldDos: mockGlobalStateCouldDos
  },
  {
    id: 3,
    text: 'enter the danger zone',
    couldDos: mockGlobalStateCouldDos
  },
  {
    id: 4,
    text: 'break into someone\'s house and organize thier stuff',
    couldDos: mockGlobalStateCouldDos
  }
]

const mockCouldDos = [
  {
    id: 1,
    text: 'give unsolicited advice to people',
  },
  {
    id: 2,
    text: 'make a painting',
  },
  {
    id: 3,
    text: 'sculpt creature from super sculpy',
  },
]

export { mockGlobalState, mockProjects, mockCouldDos }
