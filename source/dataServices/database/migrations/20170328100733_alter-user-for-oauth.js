exports.up = knex =>
  knex.schema.table('users', table => {
    table.renameColumn( 'password', 'oauthID' )
    table.varchar( 'displayName' )
    table.varchar( 'refreshToken' )
  })

exports.down = knex =>
  knex.schema.table('users', table => {
    table.renameColumn( 'oauthID', 'password' )
    table.dropColumn( 'displayName' )
    table.dropColumn( 'refreshToken' )
  })
