function init(context) {
  const useCases = {};
  Object.keys(useCases).forEach((key) => {
    // eslint-disable-next-line no-param-reassign
    context.useCases[key] = useCases[key];
  });
}

module.exports = init;
