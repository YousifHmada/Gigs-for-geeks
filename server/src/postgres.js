const pg = require('knex')({
  client: 'pg',
  connection: process.env.PG_CONNECTION_STRING,
  searchPath: ['knex', 'public'],
});

pg.schema
  .createTable('user', (table) => {
    table.increments('id');
    table.string('name');
    table.integer('age');
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('table users created');
  })
  .catch();
module.exports = pg;
