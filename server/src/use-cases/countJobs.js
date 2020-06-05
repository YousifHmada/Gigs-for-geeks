function init(context) {
  return function countJobs() {
    return context.plugins.postgres.countJobs();
  };
}

module.exports = init;
