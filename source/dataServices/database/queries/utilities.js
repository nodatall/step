import { handleDatabaseError } from 'sym/source/errorHandling/serverErrorHandlers'
import knex from '../knex'
import QueueError from '../../../errorHandling/QueueError'

const getRecordById = ( table, column, data ) => {
  const errorMessage = `getRecordById: no record in table ${table} with ${column} ${data}`

  return knex
    .table( table )
    .where( column, data )
    .first( '*' )
    .then( record => {
      if ( !record ) {
        throw new QueueError( errorMessage )
      } else {
        return record
      }
    })
    .catch( error => handleDatabaseError( error, errorMessage ) )
}

const findAllWhere = ( table, column, data, user_id ) => {
  const errorMessage = `findAllWhere: no records in table ${table} with ${column} matching ${data}`

  return knex
    .table( table )
    .where({ [column]: data, user_id })
    .returning( '*' )
    .then( records => {
      if ( !records.length ) {
        throw new QueueError( errorMessage )
      } else {
        return records
      }
    })
    .catch( error => handleDatabaseError( error, errorMessage ) )
}

export { getRecordById, findAllWhere }
