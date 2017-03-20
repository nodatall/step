exports.up = knex =>
  knex.schema.table('projects', table =>
    table.renameColumn('name', 'text')
  )

exports.down = knex =>
  knex.schema.table('projects', table =>
    table.renameColumn('text', 'name')
  )
