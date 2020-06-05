const initCustomErrorEntity = require('./customError');

function init(context) {
  const entities = {
    CustomError: initCustomErrorEntity(context),
  };
  /* eslint-disable no-param-reassign */
  Object.keys(entities).forEach((key) => {
    context.entities[key] = entities[key];
  });
}

module.exports = init;
