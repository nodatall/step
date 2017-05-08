import React from 'react'
import sinon from 'sinon'
import globalState from 'sym/source/components/utilities/globalState'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { MemoryRouter } from 'react-router'
import { mockProjects } from 'sym/source/testUtilities'
import RowList from '../RowList'

describe( '<RowContainer />', () => {
  const type = 'project'
  let wrapper, setCurrentProjectIdSpy

  beforeEach( () => {
    setCurrentProjectIdSpy = sinon.spy( globalState, 'setCurrentProjectId' )
    wrapper = mount(
      <MemoryRouter>
        <RowList type={ type } items={ mockProjects } />
      </MemoryRouter>
    )
  })

  afterEach( () => {
    setCurrentProjectIdSpy.restore()
    wrapper.unmount()
  })

  it( 'renders at least one <Row />', () =>
    expect( wrapper.find( 'Row' ).nodes.length ).to.be.above( 0 )
  )

  context( 'goToProject()', () => {

    it( 'should call globalState.setCurrentProjectId()', () => {
      wrapper.find( 'RowContainer' ).nodes[0].goToProject()
      expect( setCurrentProjectIdSpy.called ).to.equal( true )
    })

    it( 'calls browserHistory.push()', async () => {
      await wrapper.find( 'RowContainer' ).nodes[0].goToProject()
      expect( wrapper.find( 'RowContainer' ).nodes[0].context.router.history.entries[1].pathname )
        .to.equal( '/project' )
    })

  })

})
