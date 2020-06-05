function init(context) {
  return function addJob(body) {
    const { title } = body;
    if (typeof title !== 'string') {
      throw new Error('invalid title');
    }
    return context.plugins.postgres.addJob({ title });
  };
}

module.exports = init;
