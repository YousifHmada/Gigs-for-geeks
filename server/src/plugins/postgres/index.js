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
      .createTable('jobs', (table) => {
        table.increments('id');
        table.string('title');
        table.string('link');
        table.text('content');
        table.date('isoDate');
      })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log('[POSTGRES] jobs table created!');
      });
  }

  function close() {
    pg.close();
    pg.disconnect();
  }

  function findJobs(page, countPerPage) {
    const offset = (page - 1) * countPerPage;
    return pg('jobs')
      .orderBy('id', 'desc')
      .offset(offset)
      .limit(countPerPage)
      .then((rows) => rows.map(({
        id, title, link, content, isoDate,
      }) => ({
        id,
        title,
        link,
        content,
        isoDate,
      })));
  }

  // eslint-disable-next-line consistent-return
  function deleteJob(id) {
    return pg('jobs').where({ id }).delete();
  }

  function countJobs() {
    return pg('jobs')
      .count()
      .then(([{ count }]) => +count);
  }

  function addJob(body) {
    return pg('jobs').insert(body);
  }

  function getLastIsoDate() {
    return pg('jobs')
      .select('isoDate')
      .orderBy('id', 'desc')
      .limit(1)
      .then(([{ isoDate } = {}]) => (isoDate ? new Date(isoDate) : null));
  }

  return {
    close,
    findJobs,
    deleteJob,
    countJobs,
    addJob,
    getLastIsoDate,
  };
}

module.exports = init;
