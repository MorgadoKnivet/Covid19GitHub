const AuthentitcationInterface = require('../../../src/models/authentication/authentication.interface');
const { routeException } = require('../error/routeException');

module.exports.tokenCheck = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { token } = req.query;

    if (
      (authorization === null || authorization === undefined) &&
      (token === null || token === undefined)
    ) {
      throw new Error(
        JSON.stringify({
          code: 409,
          msg: 'Token não enviado'
        })
      );
    }

    const { id, teamId } = await AuthentitcationInterface.verifyToken(authorization || token);

    req.headers.authorization = { id, teamId };

    next();
  } catch (error) {
    routeException(error, req, res, next);
  }
};
