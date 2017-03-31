import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../configuration/testSetup'
import TextFieldContainer from './TextFieldContainer'
import moxios from 'moxios'
import sinon from 'sinon'

describe('<TextFieldContainer />', () => {

  it( 'calls toggleEditable on click', () => {
    const spy = sinon.spy(TextFieldContainer.prototype, 'toggleEditable')
    const wrapper = mount( <TextFieldContainer />)

    wrapper.find('TextFieldPresentation').simulate('click')
    expect(spy.calledOnce).to.equal(true)
    spy.restore()
  })

  it( 'calls editInput function', () => {
    const spy = sinon.spy(TextFieldContainer.prototype, 'editInput')
    let wrapper = mount( <TextFieldContainer /> )

    wrapper.find('TextFieldPresentation').simulate('click')
    const cows = wrapper.find('TextFieldInputPresentation')
    cows.simulate('change')

    expect(spy.calledOnce).to.equal(true)
    spy.restore()
  })

  it( 'renders the child component', () =>
    expect(shallow(<TextFieldContainer />).find('TextFieldPresentation').length).to.equal(1)
  )

})
