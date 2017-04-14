import knex from '../knex'
import QueueError from '../../../errorHandling/QueueError'

const getRecordById = ( table, column, data ) =>
  knex
    .table( table )
    .where( column, data )
    .first( '*' )
    .then( record => {
      if ( !record ) {
        throw new QueueError( `getRecordById: no record in table ${table} with ${column} ${data}` )
      } else {
        return record
      }
    })

const findAllWhere = ( table, column, data ) =>
  knex
    .table( table )
    .where( column, data )
    .returning( '*' )
    .then( records => {
      if ( !records.length ) {
        throw new QueueError( `findAllWhere: no records in table ${table} with ${column} matching ${data}` )
      } else {
        return records
      }
    })

export { getRecordById, findAllWhere }
