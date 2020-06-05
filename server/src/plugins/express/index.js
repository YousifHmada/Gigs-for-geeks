const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const initRoutes = require('./routes');
const ErrorHandler = require('./ErrorHandler');

function init(context) {
  const app = express();
  const port = context.env.PORT || 3000;
  const host = context.env.host || 'http://localhost';

  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan('[EXPRESS] :method :url :status :res[content-length] - :response-time ms'));

  app.use((req, res, next) => {
    req.context = context;
    next();
  });

  app.use('/api', initRoutes());

  app.use(new ErrorHandler(context));

  // eslint-disable-next-line no-console
  const server = app.listen(port, () => console.log(`[EXPRESS] server listening at ${host}:${port}`));

  function close() {
    server.close();
  }

  return { close };
}

module.exports = init;
