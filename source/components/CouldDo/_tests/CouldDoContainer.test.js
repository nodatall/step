import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import { mockGlobalState } from 'sym/source/testUtilities'
import { expect } from 'sym/configuration/testSetup'
import CouldDoContainer from '../CouldDoContainer'
import globalState from '../../utilities/globalState'

describe( ' <CouldDoContainer />', () => {
  let wrapper, globalStateSetSpy

  context( 'when there is a global state', () => {

    beforeEach( () => {
      globalState.set( mockGlobalState )
      globalStateSetSpy = sinon.spy( globalState, 'set' )
      wrapper = mount(
        <MemoryRouter>
          <CouldDoContainer />
        </MemoryRouter>
      )
    })

    afterEach( () => {
      wrapper.unmount()
      globalStateSetSpy.restore()
    })

    it( 'checks logic of position prop', () => {
      expect( wrapper.find( 'CouldDoContainer' ).nodes[0].findPosition( 0, 5 ) ).to.equal( 'beginning' )
      expect( wrapper.find( 'CouldDoContainer' ).nodes[0].findPosition( 4, 5 ) ).to.equal( 'end' )
      expect( wrapper.find( 'CouldDoContainer' ).nodes[0].findPosition( 3, 5 ) ).to.equal( 'middle' )
    })
    
  })

  context( 'when there is not a global state', () => {
    beforeEach( () => {
      globalState.set({})
      wrapper = mount(
        <MemoryRouter>
          <CouldDoContainer />
        </MemoryRouter>
      )
    })

    afterEach( () => wrapper.unmount() )

    it( 'should render <Loader />', () => {
      expect( wrapper.find( 'Loader' ).length ).to.eql( 2 )
    })
  })

})
