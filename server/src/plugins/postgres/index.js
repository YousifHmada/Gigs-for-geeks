/* eslint-disable no-use-before-define */
const knex = require('knex');


async function init(context) {
  const pg = knex({
    client: 'pg',
    connection: context.env.PG_CONNECTION_STRING,
    searchPath: ['knex', 'public'],
  });

  try {
    await createTables();
  // eslint-disable-next-line no-empty
  } catch {}

  function createTables() {
    return pg.schema
      .createTable('user', (table) => {
        table.increments('id');
        table.string('name');
        table.integer('age');
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('users table created!');
      });
  }

  function close() {
    pg.close();
    pg.disconnect();
  }

  return {
    close,
  };
}

module.exports = init;
