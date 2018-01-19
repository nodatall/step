import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import LogoutContainer from '../LogoutContainer'

describe( '<LogoutContainer />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount( <LogoutContainer /> )
  })

  afterEach( () => {
    wrapper.unmount()
  })

  it( 'should render logout component with class \'logout-container\'', () =>
    expect( wrapper.find( '.logout-container' ).length ).to.equal( 1 )
  )

  it( 'should render an icon', () =>
    expect( wrapper.find( 'Icon' ).length ).to.equal( 1 )
  )

})
