const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Recuperar usuário com email
    const [bandRetrieved] = await BandClass.retrieveBandByEmail(email);

    if (bandRetrieved === undefined) {
      throw new Error(
        JSON.stringify({
          code: 401,
          msg: 'Não existe banda cadastrada com esse email'
        })
      );
    }

    const { _id, firstLogin } = bandRetrieved;

    // Verificar senha
    const passwordMatch = await BandClass.verifyPasswordMatch(_id, password);
    if (!passwordMatch) {
      throw new Error(
        JSON.stringify({
          code: 401,
          msg: 'Senha incorreta'
        })
      );
    }

    // Gerar tokens de acesso
    const { token, refreshToken } = await BandClass.generateAuthTokensById(_id);

    res.status(200).json({ token, refreshToken, firstLogin });
  } catch (error) {
    next(error);
  }
};
