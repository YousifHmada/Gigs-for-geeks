const express = require('express');

const {
  findJobs,
  deleteJob,
} = require('../controllers/jobs');

function init() {
  const router = express.Router();

  router.get('/', findJobs);
  router.delete('/:id', deleteJob);

  return router;
}

module.exports = init;
