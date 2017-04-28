/* global __HOST__ */
import React from 'react'
import sinon from 'sinon'
import moxios from 'moxios'
import { mount } from 'enzyme'
import { expect } from 'sym/configuration/testSetup'
import { mockGlobalState } from 'sym/source/testUtilities'
import IconListContainer from '../IconListContainer'
import globalState from '../../../utilities/globalState'

describe( '<IconListContainer />', () => {
  let wrapper

  context( 'without icons in the globalState', () => {
    let deleteSpy, errorStub, deleteProjectStub, envelope, deleteCouldDoStub

    beforeEach( () => {
      moxios.install()
      deleteSpy = sinon.spy( IconListContainer.prototype, 'deleteItems' )
      deleteProjectStub = sinon.stub( globalState, 'deleteProject' )
      errorStub = sinon.stub( console, 'warn' ).callsFake( () => null )
      deleteCouldDoStub = sinon.stub( globalState, 'deleteCouldDo' )
      globalState.set( mockGlobalState )
      wrapper = mount( <IconListContainer type='project' id={ 1 } /> )
      envelope = mount( <IconListContainer type='could-do' id={ 1 } /> )
    })

    afterEach( () => {
      moxios.uninstall()
      deleteSpy.restore()
      errorStub.restore()
      deleteProjectStub.restore()
      deleteCouldDoStub.restore()
      wrapper.unmount()
      envelope.unmount()
    })

    it( 'renders <IconList />', () =>
      expect( wrapper.find( 'IconList' ).length ).to.equal( 1 )
    )

    context( 'deleteItems()', () => {

      it( 'makes a POST to the delete route when type is project', done => {
        wrapper.instance().deleteItems()
        moxios.wait( () => {
          const request = moxios.requests.mostRecent()
          expect( request.url ).to.equal( `${__HOST__}/project/delete/1` )
          expect( request.config.method ).to.equal( 'post' )
          request.respondWith({
            status: 200,
            response: 1
          }).then( () => {
            expect( deleteProjectStub.calledOnce ).to.equal( true )
            done()
          }).catch( done )
        })
      })

      it( 'makes a POST to the delete route when type is could-do', done => {
        envelope.instance().deleteItems()
        moxios.wait( () => {
          const request = moxios.requests.mostRecent()
          expect( request.url ).to.equal( `${__HOST__}/could-do/delete/1` )
          expect( request.config.method ).to.equal( 'post' )
          request.respondWith({
            status: 200,
            response: 1
          }).then( () => {
            expect( deleteCouldDoStub.calledOnce ).to.equal( true )
            done()
          }).catch( done )
        })
      })

      it( 'throws an error when response is an error', done => {
        wrapper.instance().deleteItems()
        moxios.wait( () => {
          const request = moxios.requests.mostRecent()
          return request.respondWith({
            status: 400,
            response: 'fakeError'
          }).then( () => {
            expect( errorStub.calledTwice ).to.equal( true )
            done()
          }).catch( done )
        })
      })
    })
  })
})
