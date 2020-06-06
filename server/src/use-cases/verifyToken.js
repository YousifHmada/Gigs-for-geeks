const jwt = require('jsonwebtoken');

function init(context) {
  return async function verifyToken(token) {
    const decoded = jwt.verify(token, context.config.JWT_SECRET);
    return decoded;
  };
}

module.exports = init;
