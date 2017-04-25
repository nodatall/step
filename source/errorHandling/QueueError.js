export default class QueueError extends Error {
  constructor( message ) {
    super( message )
    this.name = 'Error'
    this.errorQueue = [message]
    this.size = 1
    Error.captureStackTrace( this, this.constructor )
  }

  length = () => this.size

  enqueue = message => {
    for ( let i = 0; i < this.errorQueue.length; i += 1 ) {
      if ( this.errorQueue[i] === message ) return
    }

    this.errorQueue[this.length()] = message
    this.size += 1
  }

  back = () => this.errorQueue[this.size - 1]

  createMessage = () =>
    `${this.errorQueue.reduce( ( accumulator, message ) => {
      if ( accumulator === '' ) {
        return message
      }
      return `${accumulator}\n${message}`
    }, '' )}\n`

}
