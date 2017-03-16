import knex from '../knex'

const firstRecord = records => {
  if ( records.length === 0 ) {
    throw new Error('No record returned by firstRecord')
  } else {
    return records[0]
  }
}

const createRecord = ( table, attributes ) =>
  knex.table( table ).insert( attributes ).returning('*')
    .then(firstRecord)
    .catch( error => error )

const updateRecord = ( table, id, attributes ) =>
  knex
    .table( table )
    .where('id', id)
    .update(attributes)
    .returning('*')
    .then(firstRecord)
    .catch( error => error )

const deleteRecord = ( table, id ) =>
  knex
    .table( table )
    .where( 'id', id )
    .del()
    .then( deleteCount => {
      if ( deleteCount === 0 ) {
        throw new Error( `deleteRecord: no record exists with id ${id}` )
      } else {
        return deleteCount
      }
    })
    .catch( error => error )

export { createRecord, updateRecord, deleteRecord }
