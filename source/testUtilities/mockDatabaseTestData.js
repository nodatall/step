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
    text: 'eating',
    user_id: 1,
  },
  fakeProject2: {
    id: 88,
    text: 'sleeping',
    user_id: 1,
  },
  fakeProject3: {
    id: 99,
    text: 'dreaming',
    user_id: 2,
  },
  invalidProject: {
    color: 'chartreuse',
    existance: 'meaningless',
  },
  fakeEdit: {
    text: 'snoozing',
  }
}

const mockUserData = {
  fakeUser1: {
    id: 77,
    email: 'john@hallman.com',
    oauthID: 123456789,
    created_at: '2017-04-03 15:46:05.965-07',
    updated_at: null,
    displayName: 'John',
    refreshToken: 'a1b2c3d4e5',
  },
  fakeUser2: {
    id: 88,
    email: 'steve@weber.com',
    oauthID: 987654321,
    created_at: '2017-04-04 15:46:05.965-07',
    updated_at: null,
    displayName: 'Steve',
    refreshToken: 'a1b2c3d4e5f6g7h8',
  },
  fakeUser3: {
    id: 99,
    email: 'sylvan@nodatall.com',
    oauthID: 999999999,
    created_at: '2017-04-01 15:46:05.965-07',
    updated_at: null,
    displayName: 'Sylvan',
    refreshToken: 'a111111111b',
  },
  invalidUser: {
    home_address: 'Oakland',
    name: 'Jennifer'
  },
  fakeEdit: {
    displayName: 'Batman'
  }
}


export { mockCouldDoData, mockProjectData, mockUserData }
