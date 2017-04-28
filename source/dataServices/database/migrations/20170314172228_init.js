exports.up = ( knex, Promise ) =>
  Promise.all( [
    knex.schema.createTable( 'could_dos', table => {
      table.increments( 'id' ).primary()
      table.string( 'text' )
      table.boolean( 'is_completed' ).defaultTo( false )
      table.integer( 'user_id' )
      table.integer( 'project_id' )
    }),

    knex.schema.createTable( 'projects', table => {
      table.increments( 'id' ).primary()
      table.string( 'name' )
      table.integer( 'user_id' )
      table.boolean( 'is_archived' ).defaultTo( false )
    }),

    knex.schema.createTable( 'users', table => {
      table.increments( 'id' ).primary()
      table.string( 'email' ).unique()
      table.string( 'password' )
      table.timestamps()
    }),

    knex.schema.createTable( 'user_projects', table => {
      table.integer( 'user_id' )
      table.integer( 'project_id' )
      table.unique( ['user_id', 'project_id'] )
    })

  ] )

exports.down = ( knex, Promise ) =>
  Promise.all( [
    knex.schema.dropTable( 'could_dos' ),
    knex.schema.dropTable( 'projects' ),
    knex.schema.dropTable( 'users' ),
    knex.schema.dropTable( 'user_projects' )
  ] )
