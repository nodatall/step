import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { mockProjects } from 'sym/source/testUtilities'
import RowList from '../RowList'

describe( '<RowList />', () => {
  const type = 'project'
  let wrapper

  afterEach( () => wrapper.unmount() )

  context( 'when given items', () => {
    beforeEach( () => {
      wrapper = mount( <RowList type={ type } items={ mockProjects } /> )
    })

    it( `should render a div with class '${type}-rowlist-container`, () =>
      expect( wrapper.find( `.${type}-rowlist-container` ).length ).to.equal( 1 )
    )

    it( 'should render a <RowContainer /> for each item', () =>
      expect( wrapper.find( 'RowContainer' ).length ).to.equal( Object.keys( mockProjects ).length )
    )

  })

  context( 'when not given items', () => {
    beforeEach( () => {
      wrapper = mount( <RowList type={ type } items={ undefined } /> )
    })

    it( 'should render a div with class \'loading\'', () =>
      expect( wrapper.find( '.loading' ).length ).to.equal( 1 )
    )

  })

})
