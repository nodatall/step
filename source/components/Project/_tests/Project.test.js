import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from '../../../../configuration/testSetup'
import Project from '../Project'

describe( '<Project />', () => {
  const fakeProject = { text: 'master TDD' }
  const fakeCouldDos = [
    { id: 1, text: 'Pair with Sylvan' },
    { id: 2, text: 'Get feedback from Jared' }
  ]

  it( 'should render div with class \'project-container\'', () =>
    expect( shallow( <Project project={ fakeProject } /> )
      .find( '.project-container' ).length ).to.equal( 1 )
  )

  context( 'renders nested children', () => {
    let wrapper

    beforeEach( () => {
      wrapper = mount( <Project couldDos={ fakeCouldDos } project={ fakeProject } /> )
    })

    afterEach( () => wrapper.unmount() )

    it( 'should render a <Heading />', () =>
      expect( wrapper.find( 'Heading' ).length ).to.equal( 1 )
    )

    it( 'should render a <RowList />', () =>
      expect( wrapper.find( 'RowList' ).length ).to.equal( 1 )
    )

  })
})
