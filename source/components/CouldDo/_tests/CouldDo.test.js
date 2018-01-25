import React from 'react'
import { mount } from 'enzyme'
import { mockGlobalState } from 'sym/source/testUtilities'
import { expect } from 'sym/configuration/testSetup'
import { MemoryRouter } from 'react-router'
import globalState from '../../utilities/globalState'
import CouldDo from '../CouldDo'

describe( '<CouldDo />', () => {
  let wrapper

  afterEach( () => {
    wrapper.unmount()
  })

  context( 'renders the basic components of CouldDo', () => {

    beforeEach( () => {
      globalState.set( mockGlobalState )
      wrapper = mount(
        <MemoryRouter>
          <CouldDo text='learn to juggle' position='other' previousCouldDo={ () => {} } nextCouldDo={ () => {} } />
        </MemoryRouter>
      )
    })


    it( 'should render a CouldDo component with class \'could-do-container\'', () =>
      expect( wrapper.find( '.could-do-container' ).length ).to.equal( 1 )
    )

    it( 'should render CouldDo component with class \'add-could-do\'', () =>
      expect( wrapper.find( '.add-could-do' ).length ).to.equal( 1 )
    )

    it( 'should render button with class \'previous-could-do\'', () =>
      expect( wrapper.find( '.previous-could-do' ).length ).to.equal( 1 )
    )

    it( 'should render an Link element', () =>
      expect( wrapper.find( 'Link' ).length ).to.equal( 1 )
    )

  })

  context( 'renders the components of CouldDo without up button', () => {
    beforeEach( () => {
      wrapper = mount(
        <MemoryRouter>
          <CouldDo text='learn to juggle' position='beginning' previousCouldDo={ () => {} } nextCouldDo={ () => {} } />
        </MemoryRouter>
      )
    })

    it( 'should not render button with class \'previous-could-do\'', () =>
      expect( wrapper.find( '.previous-could-do' ).length ).to.equal( 0 )
    )

  })

  context( 'renders the components of CouldDo without down button', () => {
    beforeEach( () => {
      wrapper = mount(
        <MemoryRouter>
          <CouldDo text='learn to juggle' position='end' previousCouldDo={ () => {} } nextCouldDo={ () => {} } />
        </MemoryRouter>
      )
    })

    it( 'should render button with class \'previous-could-do\'', () =>
      expect( wrapper.find( '.previous-could-do' ).length ).to.equal( 1 )
    )

    it( 'should not render button with class \'next-could-do\'', () =>
      expect( wrapper.find( '.next-could-do' ).length ).to.equal( 0 )
    )

  })

})
