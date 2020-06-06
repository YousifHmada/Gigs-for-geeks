const jwt = require('jsonwebtoken');

function init(context) {
  return async function signToken() {
    return jwt.sign({ uid: 'hasdhfakf-askfkja-asklfjaklf-jasdfjk' }, context.config.JWT_SECRET);
  };
}

module.exports = init;
