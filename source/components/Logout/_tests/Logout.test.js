/* global __HOST__ */

import React from 'react'
import { mount } from 'enzyme'
import sinon from 'sinon'
import { expect } from 'sym/configuration/testSetup'
import LogoutContainer from '../LogoutContainer'

describe( '<LogoutContainer />', () => {
  let wrapper, redirectSpy

  beforeEach( () => {
    redirectSpy = sinon.spy( LogoutContainer, 'redirect' )
    wrapper = mount( <LogoutContainer /> )
  })

  afterEach( () => {
    wrapper.unmount()
    redirectSpy.restore()
  })

  it( 'should render logout component with class \'logout-container\'', () =>
    expect( wrapper.find( '.logout-container' ).length ).to.equal( 1 )
  )

  it( 'should render button with class \'logout-button\'', () =>
    expect( wrapper.find( '.logout-button' ).length ).to.equal( 1 )
  )

  it( 'should go to route /logout when button is clicked', () => {
    wrapper.find( '.logout-button' ).simulate( 'click' )
    expect( redirectSpy.called ).to.equal( true )
    expect( redirectSpy.calledWith( `${__HOST__}/logout` ) ).to.equal( true )
  })

})
