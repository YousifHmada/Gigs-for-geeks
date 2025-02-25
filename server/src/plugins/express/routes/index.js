const express = require('express');
const initJobsRoutes = require('./jobs');

function init() {
  const router = express.Router();

  router.use('/jobs', initJobsRoutes());

  return router;
}

module.exports = init;
