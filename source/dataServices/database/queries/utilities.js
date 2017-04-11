import knex from '../knex'

const getUserByOAuthID = oauth_ID =>
  knex
    .table( 'users' )
    .where( 'oauth_ID', oauth_ID )
    .then( user => {
      if ( !user ) {
        throw new Error( `getUserByOAuthID: no record of user with oauthid ${oauth_ID}.` )
      } else {
        return user
      }
    })
    .catch( error => error )

const getRecordById = ( table, id ) =>
  knex
    .table( table )
    .where( 'id', id )
    .first('*')
    .then( record => {
      if ( !record ) {
        throw new Error( `getRecordById: no record in table: ${table} with id ${id}` )
      } else {
        return record
      }
    })
    .catch( error => error )

const findAllWhere = ( table, column, data ) =>
  knex
    .table( table )
    .where( column, data )
    .returning('*')
    .then( records => {
      if ( !records.length ) {
        throw new Error( `findAllWhere: no records in table: ${table}, column: ${column}, matching ${data}` )
      } else {
        return records
      }
    })
    .catch( error => error )

export { getRecordById, findAllWhere, getUserByOAuthID }
