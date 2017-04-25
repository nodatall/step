import { expect } from 'sym/configuration/testSetup'
import sinon from 'sinon'
import { checkForAuthorization, handleGetSession } from '../authenticationController'

describe( 'authentication controller', () => {

  context( 'checkForAuthorization()', () => {
    let nextStub, redirectStub
    const fakeSession = {
      passport: {
        user: 123
      }
    }
    const fakeRequest = {
      session: fakeSession,
      isAuthenticated: () => fakeRequest.session,
      next: () => null
    }
    const fakeResponse = {
      redirect: url => url,
    }

    beforeEach( () => {
      nextStub = sinon.stub( fakeRequest, 'next' )
      redirectStub = sinon.stub( fakeResponse, 'redirect' )
    })

    afterEach( () => {
      nextStub.restore()
      redirectStub.restore()
      fakeRequest.session = fakeSession
    })

    context( 'when session exists in request', () => {

      it( 'should set user id', () => {
        checkForAuthorization( fakeRequest, fakeResponse, fakeRequest.next )
        expect( fakeRequest.userId ).to.equal( 123 )
      })

      it( 'should call next', () => {
        checkForAuthorization( fakeRequest, fakeResponse, fakeRequest.next )
        expect( nextStub.calledOnce ).to.equal( true )
      })

    })

    it( 'should respond with a redirect if no session and node_env is not test', () => {
      process.env.NODE_ENV = 'cows'
      fakeRequest.session = false
      checkForAuthorization( fakeRequest, fakeResponse, fakeRequest.next )
      expect( redirectStub.calledOnce ).to.equal( true )
      process.env.NODE_ENV = 'test'
    })

    it( 'should redirect to /', () => {
      process.env.NODE_ENV = 'cows'
      fakeRequest.session = false
      checkForAuthorization( fakeRequest, fakeResponse, fakeRequest.next )
      expect( redirectStub.getCall( 0 ).args[0] ).to.equal( '/' )
      process.env.NODE_ENV = 'test'
    })

    it( 'should set request user ID to 1', () => {
      fakeRequest.session = false
      checkForAuthorization( fakeRequest, fakeResponse, fakeRequest.next )
      expect( fakeRequest.userId ).to.equal( 1 )
    })

  })

})

describe( 'handleGetSession()', () => {
  const jsonSpy = sinon.spy()
  const fakeNext = sinon.spy()
  const fakeRequest = {
    userId: 1
  }
  const fakeResponse = {
    json: jsonSpy
  }

  it( 'should pass userId from request to response.json()', () => {
    handleGetSession( fakeRequest, fakeResponse, fakeNext )
    expect( jsonSpy.firstCall.args[0].userId ).to.equal( 1 )
  })

  it( 'should throw an error if there is no userId in request', () => {
    delete fakeRequest.userId
    handleGetSession( fakeRequest, fakeResponse, fakeNext )
    expect( fakeNext.firstCall.args[0].back().includes( 'handleGetSession:' ) ).to.equal( true )
    fakeRequest.userId = 1
  })

})
