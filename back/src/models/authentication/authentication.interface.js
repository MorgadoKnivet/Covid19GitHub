const AuthenticationClass = require('./authentication');

module.exports.generateToken = async data => {
  try {
    return AuthenticationClass.generateToken(data, '7d', 'token');
  } catch (error) {
    throw new Error(
      JSON.stringify({
        code: 500,
        msg: 'Erro ao gerar o token'
      })
    );
  }
};

module.exports.generateRefreshToken = async data => {
  try {
    return AuthenticationClass.generateToken(data, '7d', 'refresh');
  } catch (error) {
    throw new Error(
      JSON.stringify({
        code: 500,
        msg: 'Erro ao gerar o refresh token'
      })
    );
  }
};

module.exports.verifyToken = async token => {
  try {
    const { data, type } = await AuthenticationClass.verifyToken(token);
    if (type === 'token') {
      return data;
    }
    throw new Error(
      JSON.stringify({
        code: 401,
        msg: 'O token enviado é do tipo incorreto'
      })
    );
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error(
        JSON.stringify({
          code: 401,
          msg: 'Token expirado'
        })
      );
    }

    throw new Error(
      JSON.stringify({
        code: 401,
        msg: 'Erro ao verificar o token'
      })
    );
  }
};

module.exports.verifyRefreshToken = async token => {
  try {
    const { data, type } = await AuthenticationClass.verifyToken(token);
    if (type === 'refresh') {
      return data;
    }
    throw new Error(
      JSON.stringify({
        code: 401,
        msg: 'O token enviado é do tipo incorreto'
      })
    );
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error(
        JSON.stringify({
          code: 401,
          msg: 'Token expirado'
        })
      );
    }

    throw new Error(
      JSON.stringify({
        code: 401,
        msg: 'Erro ao verificar o token'
      })
    );
  }
};
