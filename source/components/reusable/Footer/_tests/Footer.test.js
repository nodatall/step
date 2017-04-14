import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import Footer from '../Footer'

describe( '<Footer>', () => {

  it( 'renders a div with class \'footer-container\' ', () =>
    expect( shallow( <Footer />).find( '.footer-container' ).length).to.equal( 1 )
  )

  it( 'renders a button', () =>
    expect( shallow( <Footer />).find( 'button' ).length).to.equal( 1 )
  )

  context( 'when type is \'couldDo\'', () => {
    const wrapper = mount( <Footer type='couldDo' /> )
    const input = wrapper.find( 'input' )

    it( 'renders input with text, "Add a could do"', () => {
      expect( input.length ).to.equal( 1 )
      expect( input.props().placeholder ).to.contain( 'Add a could do' )
    })

  })

  context( 'when type is \'project\'', () => {
    const wrapper = mount( <Footer type='project' /> )
    const input = wrapper.find( 'input' )

    it( 'renders input with text, "Create new project"', () => {
      expect( input.length ).to.equal( 1 )
      expect( input.props().placeholder ).to.contain( 'Create new project' )
    })

  })

})
