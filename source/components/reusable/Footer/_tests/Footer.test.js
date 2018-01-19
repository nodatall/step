import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import Footer from '../Footer'

describe( '<Footer>', () => {

  it( 'renders a div with class \'footer-container\' ', () =>
    expect( shallow( <Footer /> ).find( '.footer-container' ).length ).to.equal( 1 )
  )

  it( 'renders a button', () =>
    expect( shallow( <Footer /> ).find( 'button' ).length ).to.equal( 1 )
  )

  context( 'when type is \'couldDo\'', () => {
    const wrapper = mount( <Footer type='could-do' /> )
    const input = wrapper.find( 'input' )

    it( 'renders input with text, "New could do"', () => {
      expect( input.length ).to.equal( 1 )
      expect( input.props().placeholder ).to.contain( 'New could do' )

      wrapper.unmount()
    })

  })

  context( 'when type is \'project\'', () => {
    const wrapper = mount( <Footer type='project' /> )
    const input = wrapper.find( 'input' )

    it( 'renders input with text, "New project"', () => {
      expect( input.length ).to.equal( 1 )
      expect( input.props().placeholder ).to.contain( 'New project' )

      wrapper.unmount()
    })

  })

})
