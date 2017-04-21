import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import App from '../App'

describe( '<App />', () => {
  let wrapper

  beforeEach( () => {
    wrapper = mount( <App /> )
  })

  afterEach( () => wrapper.unmount() )

  it( 'should render a <Router />', () => {
    expect( wrapper.find( 'Router' ).length ).to.equal( 1 )
  })


})
