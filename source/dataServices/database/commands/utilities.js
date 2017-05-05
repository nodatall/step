import _ from 'lodash'
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

const updateRecordWithUserID = ( table, id, user_id, attributes ) =>
  knex
    .table( table )
    .where({ id, user_id })
    .update( attributes )
    .returning( '*' )
    .then( firstRecord )
    .catch( error => {
      const errorMessage = `updateRecordWithUserID: unable to updateRecordWithUserID with id ${id} and user_id ${user_id} in table ${table} with ${JSON.stringify( attributes )}`
      return handleDatabaseError( error, errorMessage )
    })

const updateOrderWithUserId = ( table, user_id, attributes ) => {
  const updateQuery = [
    `INSERT INTO ${table} AS t (id, "order") VALUES`,
    _.map( attributes, ( record ) => `(${record.id}, ${record.order})` ).join( ', ' ),
    'ON CONFLICT (id) DO UPDATE SET',
    '"order" = EXCLUDED.order',
    `WHERE t.user_id = ${user_id}`
  ].join( ' ' )

  return knex.raw( updateQuery )
    .catch( error => {
      const errorMessage = `updateOrderWithUserId: unable to updateOrderWithUserId with user_id ${user_id} in table ${table} with ${JSON.stringify( attributes )}`
      return handleDatabaseError( error, errorMessage )
    })
}

const updateRecord = ( table, id, attributes ) =>
  knex
    .table( table )
    .where({ id })
    .update( attributes )
    .returning( '*' )
    .then( firstRecord )
    .catch( error => {
      const errorMessage = `updateRecord: unable to updateRecord with id ${id} in table ${table} with ${JSON.stringify( attributes )}`
      return handleDatabaseError( error, errorMessage )
    })

const deleteRecordWithUserID = ( table, id, user_id ) => {
  const errorMessage = `deleteRecordWithUserID: no record exists with id ${id} and user_id ${user_id}`
  return knex
    .table( table )
    .where({ id, user_id })
    .del()
    .then( deleteCount => {
      if ( !deleteCount ) {
        throw new QueueError( errorMessage )
      } else {
        return deleteCount
      }
    })
    .catch( error => handleDatabaseError( error, errorMessage ) )
}

const deleteRecord = ( table, id ) => {
  const errorMessage = `deleteRecord: no record exists with id ${id}`
  return knex
    .table( table )
    .where({ id })
    .del()
    .then( deleteCount => {
      if ( !deleteCount ) {
        throw new QueueError( errorMessage )
      } else {
        return deleteCount
      }
    })
    .catch( error => handleDatabaseError( error, errorMessage ) )
}
export {
  createRecord,
  updateRecordWithUserID,
  updateOrderWithUserId,
  updateRecord,
  deleteRecordWithUserID,
  deleteRecord
}
