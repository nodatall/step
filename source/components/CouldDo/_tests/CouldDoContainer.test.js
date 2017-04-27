import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { mockGlobalState } from 'sym/source/testUtilities'
import { expect } from 'sym/configuration/testSetup'
import CouldDoContainer from '../CouldDoContainer'
import globalState from '../../utilities/globalState'

describe( ' <CouldDoContainer />', () => {
  let wrapper

  beforeEach( () => {
    globalState.set( mockGlobalState )
    wrapper = mount(
      <MemoryRouter>
        <CouldDoContainer />
      </MemoryRouter>
    )
  })

  afterEach( () => wrapper.unmount() )

  it( 'checks logic of position prop', () => {
    expect( wrapper.find( 'CouldDoContainer' ).nodes[0].findPosition( 0, 5 ) ).to.equal( 'beginning' )
    expect( wrapper.find( 'CouldDoContainer' ).nodes[0].findPosition( 4, 5 ) ).to.equal( 'end' )
    expect( wrapper.find( 'CouldDoContainer' ).nodes[0].findPosition( 3, 5 ) ).to.equal( 'middle' )
  })

})
