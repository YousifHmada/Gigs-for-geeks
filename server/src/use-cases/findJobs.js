function init(context) {
  return function findJobs(page) {
    const countPerPage = context.config.JOBS_PER_PAGE;
    return context.plugins.postgres
      .findJobs(page, countPerPage)
      .then((results) => results.map((body) => {
        const job = new context.entities.Job(body);
        return job.getMetaData();
      }));
  };
}

module.exports = init;
