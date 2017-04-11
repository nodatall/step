exports.up = knex =>
  knex.schema.table('users', table => {
    table.renameColumn( 'displayName', 'display_name' )
    table.renameColumn( 'refreshToken', 'refresh_token' )
    table.renameColumn( 'oauthID', 'oauth_ID' )
  })


exports.down = knex =>
  knex.schema.table('users', table => {
    table.renameColumn( 'display_name', 'displayName' )
    table.renameColumn( 'refresh_token', 'refreshToken' )
    table.renameColumn( 'oauth_ID', 'oauthID' )
  })
