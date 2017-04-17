const mockGlobalState = {
  currentProjectId: 2,
  couldDos: {
    1: [
      { text: 'make my breakfast', id: 1 },
      { text: 'eat my breakfast', id: 2 },
      { text: 'relax', id: 3 }
    ],
    2: [
      { text: 'pick some flowers', id: 4 },
      { text: 'eat some flowers', id: 5 },
      { text: 'smell some flowers', id: 6 }
    ],
    3: [
      { text: 'call a friend', id: 7 },
      { text: 'give unsolicited advice to people', id: 8 },
      { text: 'make a painting', id: 9 }
    ],
  },
  projects: [
    { text: 'hello', id: 1 },
    { text: 'goodbye', id: 2 }
  ],
  currentCouldDoIndex: 0
}

export default mockGlobalState
