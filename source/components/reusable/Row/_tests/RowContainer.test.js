import React from 'react'
import sinon from 'sinon'
import globalState from 'sym/source/components/utilities/globalState'
import { shallow, mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { browserHistory } from 'react-router'
import RowContainer from '../RowContainer'

describe( '<RowContainer />', () => {
  let wrapper, setCurrentProjectIdSpy, browserHistoryPushStub
  const wrapperProps = {
    fieldType: 'project',
    text: 'moo',
    id: 4,
    goToProject: () => null
  }

  it( 'renders a <Row />', () =>
    expect( shallow( <RowContainer /> ).find( 'Row' ).length ).to.equal( 1 )
  )

  beforeEach( () => {
    setCurrentProjectIdSpy = sinon.spy( globalState, 'setCurrentProjectId' )
    browserHistoryPushStub = sinon.stub( browserHistory, 'push' )
    wrapper = mount( <RowContainer { ...wrapperProps } /> )
  })

  afterEach( () => {
    setCurrentProjectIdSpy.restore()
    browserHistoryPushStub.restore()
    wrapper.unmount()
  })

  it( 'should pass all props to child <Row />', () => {
    const rowProps = wrapper.find( 'Row' ).props()
    expect( rowProps ).to.eql( wrapperProps )
  })

  context( 'goToProject()', () => {

    it( 'should call globalState.setCurrentProjectId()', () => {
      wrapper.instance().goToProject()
      expect( setCurrentProjectIdSpy.calledOnce ).to.equal( true )
    })

    it( 'setCurrentProjectId is called with id prop', () => {
      wrapper.instance().goToProject()
      expect( setCurrentProjectIdSpy.calledWith( wrapperProps.id ) ).to.equal( true )
    })

    it( 'calls browserHistory.push()', async () => {
      await wrapper.instance().goToProject()
      expect( browserHistoryPushStub.callCount ).to.equal( 1 )
    })

  })

})
