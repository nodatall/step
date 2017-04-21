import React from 'react'
import { mount } from 'enzyme'
import { expect } from '../../../../configuration/testSetup'
import CouldDo from '../CouldDo'

describe( '<CouldDo />', () => {
  let wrapper

  afterEach( () => {
    wrapper.unmount()
  })

  context( 'renders the basic components of CouldDo', () => {

    beforeEach( () => {
      wrapper = mount( <CouldDo text='learn to juggle' position='other' previousCouldDo={ () => {} } nextCouldDo={ () => {} } /> )
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

    it( 'should render button with class \'next-could-do\'', () =>
      expect( wrapper.find( '.next-could-do' ).length ).to.equal( 1 )
    )

    it( 'should render an Link element', () =>
      expect( wrapper.find( 'Link' ).length ).to.equal( 1 )
    )

  })

  context( 'renders the components of CouldDo without up button', () => {
    beforeEach( () => {
      wrapper = mount( <CouldDo text='learn to juggle' position='beginning' previousCouldDo={ () => {} } nextCouldDo={ () => {} } /> )
    })

    it( 'should not render button with class \'previous-could-do\'', () =>
      expect( wrapper.find( '.previous-could-do' ).length ).to.equal( 0 )
    )

    it( 'should render button with class \'next-could-do\'', () =>
      expect( wrapper.find( '.next-could-do' ).length ).to.equal( 1 )
    )

  })

  context( 'renders the components of CouldDo without down button', () => {
    beforeEach( () => {
      wrapper = mount( <CouldDo text='learn to juggle' position='end' previousCouldDo={ () => {} } nextCouldDo={ () => {} } /> )
    })

    it( 'should render button with class \'previous-could-do\'', () =>
      expect( wrapper.find( '.previous-could-do' ).length ).to.equal( 1 )
    )

    it( 'should not render button with class \'next-could-do\'', () =>
      expect( wrapper.find( '.next-could-do' ).length ).to.equal( 0 )
    )

  })

  context( 'tests the buttons work', () => {
    let testString = ''

    beforeEach( () => {
      wrapper = mount( <CouldDo
        text='learn to juggle'
        position='middle'
        previousCouldDo={ () => {
          testString += 'previousCouldDo is called : '
        } }
        nextCouldDo={ () => {
          testString += 'nextCouldDo is called.'
        } }
      /> )

      wrapper.find( '.previous-could-do' ).simulate( 'click' )
      wrapper.find( '.next-could-do' ).simulate( 'click' )
    })


    it( 'previous button clicks triggers functions', () => {
      expect( testString.includes( 'previousCouldDo is called : ' ) ).to.equal( true )
    })

    it( 'next button clicks triggers functions', () => {
      expect( testString.includes( 'nextCouldDo is called.' ) ).to.equal( true )
    })

  })

})
