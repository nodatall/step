import React from 'react'
import { shallow } from 'enzyme'
import { expect } from '../../../configuration/testSetup'
import TextFieldContainer from './TextFieldContainer'

describe('<TextFieldContainer />', () => {

  it('renders the child component', () =>
    expect(shallow(<TextFieldContainer />).find('TextFieldPresentation').length).to.equal(1)
  )

})
