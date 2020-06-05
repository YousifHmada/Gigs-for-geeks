function init(context) {
  return function deleteJob(id) {
    return context.plugins.postgres.deleteJob(id);
  };
}

module.exports = init;
