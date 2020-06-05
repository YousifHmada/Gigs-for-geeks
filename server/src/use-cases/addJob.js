function init(context) {
  return function addJob(body) {
    const {
      title, link, content, isoDate,
    } = body;
    return context.plugins.postgres.addJob({
      title, link, content, isoDate,
    });
  };
}

module.exports = init;
