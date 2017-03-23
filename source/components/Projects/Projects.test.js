import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '../../../configuration/testSetup'
import ProjectListContainer from './ProjectListContainer'

describe('<ProjectListContainer />', () => {

  it('renders child component', () =>
    expect(shallow(<ProjectListContainer />).find('ProjectListPresentation').length).to.equal(1)
  )

})
