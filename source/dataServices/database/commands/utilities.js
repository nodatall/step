import knex from '../knex'
import QueueError from '../../../errorHandling/QueueError'
import { handleDatabaseError } from '../../../errorHandling/serverErrorHandlers'

const firstRecord = records => {
  if ( !records.length ) {
    throw new QueueError( 'firstRecord: No records returned' )
  } else {
    return records[0]
  }
}

const createRecord = ( table, attributes ) =>
  knex
    .table( table )
    .insert( attributes )
    .returning( '*' )
    .then( firstRecord )
    .catch( error => {
      const errorMessage = `createRecord: unable to insert ${JSON.stringify( attributes )} into table ${table}`
      return handleDatabaseError( error, errorMessage )
    })

const updateRecord = ( table, id, attributes ) =>
  knex
    .table( table )
    .where( 'id', id )
    .update( attributes )
    .returning( '*' )
    .then( firstRecord )
    .catch( error => {
      const errorMessage = `updateRecord: unable to updateRecord with id ${id} in table ${table} with ${JSON.stringify( attributes )}`
      return handleDatabaseError( error, errorMessage )
    })

const deleteRecord = ( table, id ) =>
  knex
    .table( table )
    .where( 'id', id )
    .del()
    .then( deleteCount => {
      if ( !deleteCount ) {
        throw new QueueError( `deleteRecord: no record exists with id ${id}` )
      } else {
        return deleteCount
      }
    })

export { createRecord, updateRecord, deleteRecord }
