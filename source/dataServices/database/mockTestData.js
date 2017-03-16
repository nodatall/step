const mockCouldDoData = {
  fakeCouldDo1: {
    id: 998,
    text: 'eat breakfast',
    user_id: 1,
    project_id: 1
  },
  fakeCouldDo2: {
    id: 977,
    text: 'eat zero sugar',
    user_id: 1,
    project_id: 1
  },
  fakeCouldDo3: {
    id: 456,
    text: 'be excellent to each other',
    user_id: 1,
    project_id: 7
  },
  invalidCouldDo: {
    text: 'make toast',
    how_dark: 'burnt'
  },
  fakeEdit: {
    text: 'eat lunch'
  }
}

const mockProjectData = {
  fakeProject1: {
    id: 77,
    name: 'eating',
    user_id: 1,
  },
  fakeProject2: {
    id: 88,
    name: 'sleeping',
    user_id: 1,
  },
  fakeProject3: {
    id: 99,
    name: 'dreaming',
    user_id: 2,
  },
  invalidProject: {
    color: 'chartreuse',
    existance: 'meaningless',
  },
  fakeEdit: {
    name: 'snoozing',
  }
}

export { mockCouldDoData, mockProjectData }
