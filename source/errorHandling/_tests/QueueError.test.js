import { expect } from '../../../configuration/testSetup'
import QueueError from '../QueueError'

describe( 'QueueError', () => {
  let errorOfEternity
  const originErrorMessage = 'You made a major life mistake'
  const secondErrorMessage = 'Death comes for you'

  beforeEach( () => {
    errorOfEternity = new QueueError( originErrorMessage )
  })

  it( 'should be an instance of error', () => {
    try {
      throw errorOfEternity
    } catch ( error ) {
      expect( error ).to.be.an.instanceof( Error )
    }
  })

  it( 'should have name \'QueueError\'', () => {
    try {
      throw errorOfEternity
    } catch ( error ) {
      expect( error.name ).to.equal( 'Error' )
    }
  })

  it( 'should have a stack property', () => {
    try {
      throw errorOfEternity
    } catch ( error ) {
      expect( error.stack.length ).to.be.above( 1 )
    }
  })

  context( 'length()', () => {

    it( 'should return 1 when first created', () => {
      try {
        throw errorOfEternity
      } catch ( error ) {
        expect( error.length() ).to.equal( 1 )
      }
    })

    it( 'should return 2 with when a message has been added', () => {
      try {
        throw errorOfEternity
      } catch ( error ) {
        errorOfEternity.enqueue( 'All hope is lost' )
        expect( error.length() ).to.equal( 2 )
      }
    })

  })

  context( 'back() ', () => {

    it( 'should return the last item in the errorQueue', () => {
      try {
        throw errorOfEternity
      } catch ( error ) {
        expect( error.back() ).to.equal( originErrorMessage )
      }
    })

  })

  context( 'enqueue()', () => {

    it( 'should add an item to the back of the errorQueue', () => {
      try {
        throw errorOfEternity
      } catch ( error ) {
        error.enqueue( secondErrorMessage )
        expect( error.back() ).to.equal( secondErrorMessage )
      }
    })

  })

  context( 'createMessage()', () => {

    it( 'should return a string with each message of the errorQueue separated by a \'\\n\'', () => {
      try {
        throw errorOfEternity
      } catch ( error ) {
        error.enqueue( secondErrorMessage )
        expect( error.createMessage() ).to.equal( `${originErrorMessage}\n${secondErrorMessage}\n` )
      }
    })

  })

})
