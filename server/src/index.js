/* eslint-disable no-use-before-define */
/* eslint-disable no-console */
const fs = require('fs');
const initPlugins = require('./plugins');
const initUseCases = require('./use-cases');
const initEntities = require('./entities');

function main({ env = {}, config = {} } = {}) {
  const context = {
    config,
    env,
    plugins: {},
    useCases: {},
    entities: {},
    signal,
  };

  // Disconnect plugins in case of signal recieved
  function signal(error) {
    console.error(error);
    Object.keys(context.plugins).forEach((key) => {
      try {
        // Close plugin connection
        context.plugins[key].close();
        // eslint-disable-next-line no-empty
      } catch {}
    });
  }

  initPlugins(context);
  initUseCases(context);
  initEntities(context);

  return context;
}

const { env } = process;
let config;

try {
  config = JSON.parse(fs.readFileSync('config.json'));
} catch (error) {
  config = {};
}

// Start main process
const context = main({ env, config });

// Disconnect plugins in case processe crashed
process.on('unhandledRejection', context.signal);
process.on('uncaughtException', context.signal);
process.on('exit', context.signal);
