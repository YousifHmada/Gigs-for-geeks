/* eslint-disable no-param-reassign */
const initExpress = require('./express');
const initPostgres = require('./postgres');

async function init(context) {
  context.plugins.express = await initExpress(context);
  context.plugins.postgrs = await initPostgres(context);
}

module.exports = init;
