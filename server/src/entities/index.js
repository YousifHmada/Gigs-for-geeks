const initCustomErrorEntity = require('./customError');
const initJobEntity = require('./job');

function init(context) {
  const entities = {
    CustomError: initCustomErrorEntity(context),
    Job: initJobEntity(context),
  };
  /* eslint-disable no-param-reassign */
  Object.keys(entities).forEach((key) => {
    context.entities[key] = entities[key];
  });
}

module.exports = init;
