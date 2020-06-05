const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const initRoutes = require('./routes');
const ErrorHandler = require('./ErrorHandler');

function init(context) {
  const app = express();
  const port = context.env.PORT || 3000;

  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

  app.use((req, res, next) => {
    req.context = context;
    next();
  });

  app.use('/api', initRoutes());

  app.use(new ErrorHandler(context));

  // eslint-disable-next-line no-console
  const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

  function close() {
    server.close();
  }

  return { close };
}

module.exports = init;
