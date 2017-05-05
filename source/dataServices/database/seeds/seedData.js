exports.seed = knex =>
  knex( 'projects' ).del()
    .then( () =>
      knex( 'projects' ).insert( [
        {
          text: 'Learn to krump',
          user_id: 1,
          order: 1
        },
        {
          text: 'Get job that pays 120k',
          user_id: 1,
          order: 2
        },
        {
          text: 'Become a famous poet',
          user_id: 1,
          order: 3
        }
      ] )
    )
    .then( () => knex( 'could_dos' ).del() )
    .then( () =>
      knex( 'could_dos' ).insert( [
        {
          text: 'Watch krump competition video',
          user_id: 1,
          project_id: 1,
          order: 0
        },
        {
          text: 'Do some stretching and yoga',
          user_id: 1,
          project_id: 1,
          order: 1
        },
        {
          text: 'Start krumping!',
          user_id: 1,
          project_id: 1,
          order: 2
        },
        {
          text: 'Complete Learner\'s Guild',
          user_id: 1,
          project_id: 2,
          order: 0
        },
        {
          text: 'Get rejected 30+ times',
          user_id: 1,
          project_id: 2,
          order: 1
        },
        {
          text: 'Find awesome job in San Francisco',
          user_id: 1,
          project_id: 2,
          order: 2
        },
        {
          text: 'Suffer great loss',
          user_id: 1,
          project_id: 3,
          order: 0
        },
        {
          text: 'Stare at a branch blowing in the wind all day',
          user_id: 1,
          project_id: 3,
          order: 1
        },
        {
          text: 'Fall in love',
          user_id: 1,
          project_id: 3,
          order: 2
        }
      ] )
    )
