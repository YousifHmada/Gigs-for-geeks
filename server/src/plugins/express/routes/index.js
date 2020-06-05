const express = require('express');

function init() {
  const router = express.Router();

  router.get('/', async (req, res) => {
    res.send('hello world');
  });

  return router;
}

module.exports = init;
