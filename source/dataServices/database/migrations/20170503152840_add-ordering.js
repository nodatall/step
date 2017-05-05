exports.up = knex =>
  Promise.all( [
    knex.schema.table( 'projects', table => {
      table.specificType( 'order', 'serial' )
    }),
    knex.schema.table( 'could_dos', table => {
      table.specificType( 'order', 'serial' )
    })
  ] )

exports.down = knex =>
  Promise.all( [
    knex.schema.table( 'projects', table => {
      table.dropColumn( 'order' )
    }),
    knex.schema.table( 'could_dos', table => {
      table.dropColumn( 'order' )
    })
  ] )
