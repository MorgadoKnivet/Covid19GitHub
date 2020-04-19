const { routeException } = require('./error/routeException');

const { tokenCheck } = require('./authorization/tokenCheck');

module.exports.routeException = routeException;
module.exports.tokenCheck = tokenCheck;
