const UserClass = require('../user');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Recuperar usuário com email
    const [userRetrieved] = await UserClass.retrieveUserByEmail(email);

    if (userRetrieved === undefined) {
      throw new Error(
        JSON.stringify({
          code: 401,
          msg: 'Não existe usuário cadastrado com esse email'
        })
      );
    }

    const { _id, firstLogin } = userRetrieved;

    // Verificar senha
    const passwordMatch = await UserClass.verifyPasswordMatch(_id, password);

    if (!passwordMatch) {
      throw new Error(
        JSON.stringify({
          code: 401,
          msg: 'Senha incorreta'
        })
      );
    }

    // Gerar tokens de acesso
    const { token, refreshToken } = await UserClass.generateAuthTokensById(_id);

    res.status(200).json({ token, refreshToken, firstLogin });
  } catch (error) {
    next(error);
  }
};
