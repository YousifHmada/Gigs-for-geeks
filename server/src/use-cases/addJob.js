function init(context) {
  return function addJob(body) {
    return context.plugins.postgres.addJob(body);
  };
}

module.exports = init;
