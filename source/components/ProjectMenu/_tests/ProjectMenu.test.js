import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { mockProjects } from 'sym/source/testUtilities'
import ProjectMenu from '../ProjectMenu'

describe( '<ProjectMenu />', () => {
  let wrapper

  afterEach( () => wrapper.unmount() )

  context( 'with projects passed as prop', () => {
    beforeEach( () => {
      wrapper = mount( <ProjectMenu projects={ mockProjects } /> )
    })

    it( 'renders .project-menu-container', () =>
      expect( wrapper.find( '.project-menu-container' ).length ).to.equal( 1 )
    )

    it( 'renders <RowList />', () =>
      expect( wrapper.find( 'RowList' ).length ).to.equal( 1 )
    )

    it( 'renders <PageInstruction />', () =>
      expect( wrapper.find( 'PageInstruction' ).length ).to.equal( 0 )
    )

    it( 'renders <FooterContainer />', () =>
      expect( wrapper.find( 'FooterContainer' ).length ).to.equal( 1 )
    )

    it( 'renders <Heading />', () =>
      expect( wrapper.find( 'Heading' ).length ).to.equal( 1 )
    )

  })

  context( 'with no projects passed as prop', () => {
    beforeEach( () => {
      wrapper = mount( <ProjectMenu /> )
    })

    it( 'renders <PageInstruction />', () =>
      expect( wrapper.find( 'PageInstruction' ).length ).to.equal( 1 )
    )

    it( 'renders <RowList />', () =>
      expect( wrapper.find( 'RowList' ).length ).to.equal( 0 )
    )

  })

})
