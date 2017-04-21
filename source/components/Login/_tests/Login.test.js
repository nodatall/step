import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'sym/configuration/testSetup'
import LoginContainer from '../LoginContainer'

describe( '<LoginContainer />', () => {
  let wrapper, redirectSpy

  beforeEach( () => {
    redirectSpy = sinon.spy( LoginContainer, 'redirect' )
    wrapper = mount( <LoginContainer /> )
  })

  afterEach( () => {
    wrapper.unmount()
    redirectSpy.restore()
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

  it( 'should go to route /auth/google when button clicked', () => {
    wrapper.find( '.login-button' ).simulate( 'click' )
    expect( redirectSpy.called ).to.equal( true )
    expect( redirectSpy.calledWith( `${__HOST__}/auth/google` ) ).to.equal( true ) // eslint-disable-line
  })

})
