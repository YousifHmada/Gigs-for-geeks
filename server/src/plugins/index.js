/* eslint-disable no-param-reassign */
const initExpress = require('./express');
const initPostgres = require('./postgres');
const initRSSFeed = require('./rss-feed');

async function init(context) {
  context.plugins.express = await initExpress(context);
  context.plugins.postgres = await initPostgres(context);
  context.plugins.rssFeed = await initRSSFeed(context);
}

module.exports = init;
