exports.up = ( knex, Promise ) =>
  Promise.all( [
    knex.schema.createTable( 'sessions', table => {
      table.string( 'sid' ).notNullable()
      table.json( 'sess' ).notNullable()
      table.timestamp( 'expired' ).notNullable()
    })
  ] )

exports.down = ( knex, Promise ) =>
  Promise.all( [
    knex.schema.dropTable( 'sessions' )
  ] )
