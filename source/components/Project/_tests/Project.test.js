import React from 'react'
import { MemoryRouter } from 'react-router'
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
      wrapper = mount(
        <MemoryRouter>
          <Project couldDos={ fakeCouldDos } project={ fakeProject } />
        </MemoryRouter>
      )
    })

    afterEach( () => wrapper.unmount() )

    it( 'should render a <Heading />', () =>
      expect( wrapper.find( 'Heading' ).length ).to.equal( 1 )
    )

    it( 'should render <Loader />', () =>
      expect( wrapper.find( 'Loader' ).length ).to.equal( 2 )
    )

    it( 'should render a <Link />', () =>
      expect( wrapper.find( 'Link' ).length ).to.equal( 2 )
    )

  })
})
