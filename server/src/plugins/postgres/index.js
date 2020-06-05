/* eslint-disable no-plusplus */
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
        console.log('[POSTGRES] users table created!');
      });
  }

  function close() {
    pg.close();
    pg.disconnect();
  }

  const jobs = [];
  let lastId = 0;

  function findJobs(page, countPerPage) {
    const start = (page - 1) * countPerPage;
    const end = start + countPerPage;
    return jobs.slice(start, end);
  }

  // eslint-disable-next-line consistent-return
  function deleteJob(id) {
    const index = jobs.findIndex((job) => job.id === id);
    // eslint-disable-next-line no-bitwise
    if (~index) {
      return jobs.splice(index, 1);
    }
  }

  function countJobs() {
    return jobs.length;
  }

  function addJob(body) {
    jobs.push({ ...body, id: lastId++ });
  }

  return {
    close,
    findJobs,
    deleteJob,
    countJobs,
    addJob,
  };
}

module.exports = init;
