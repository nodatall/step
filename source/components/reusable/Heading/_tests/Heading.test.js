import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from '../../../../../configuration/testSetup'
import Heading from '../Heading'

describe( '<Heading>', () => {

  it( 'renders a div with class \'heading-container\' ', () =>
    expect( shallow( <Heading />).find( '.heading-container' ).length).to.equal( 1 )
  )

  it( 'renders an h1 with text', () => {
    const fakeText = 'cows'
    const wrapper = mount( <Heading text={ fakeText } /> )
    const h1 = wrapper.find( 'h1' )

    expect( h1.length ).to.equal( 1 )
    expect( h1.html() ).to.contain( fakeText )
  })

  context( 'when type is \'couldDo\'', () => {
    const wrapper = mount( <Heading type='couldDo' /> )

    it( 'renders no Icon', () => {
      expect( wrapper.find( 'Icon' ).length ).to.equal( 0 )
    })

  })

  context( 'when type is \'project\'', () => {
    const wrapper = mount( <Heading type='project' /> )

    it( 'renders an Icon when passed type \'project\'', () => {
      expect( wrapper.find( 'Icon' ).length).to.equal( 1 )
    })

  })

})
