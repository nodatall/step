import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import LoginContainer from '../LoginContainer'

describe( '<LoginContainer />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount( <LoginContainer /> )
  })

  afterEach( () => {
    wrapper.unmount()
  })

  it( 'should render a <Heading />', () =>
    expect( wrapper.find( 'Heading' ).length ).to.equal( 1 )
  )

  it( 'should render login component with class \'login-container\'', () =>
    expect( wrapper.find( '.login-container' ).length ).to.equal( 1 )
  )

  it( 'should render button with class \'login-button\'', () =>
    expect( wrapper.find( '.login-button' ).length ).to.equal( 1 )
  )

})
