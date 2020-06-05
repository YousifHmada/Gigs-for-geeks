function init(context) {
  return function findJobs(page) {
    const countPerPage = context.config.JOBS_PER_PAGE;
    return context.plugins.postgres.findJobs(page, countPerPage).map(e => e.title);
  };
}

module.exports = init;
