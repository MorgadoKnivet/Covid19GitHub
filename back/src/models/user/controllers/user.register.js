const UserClass = require('../user');

module.exports = async (req, res, next) => {
  try {
    const { email, password, username, birthday, sex, favoritBand } = req.body;

    // Verificar se usuário a ser cadastrado é válido
    /*
    await UserClass.validNewUserClean({
      email,
      password,
      username,
      birthday,
      sex:"",
      favoritBand
    });
    */

    // Registrar novo usuário
    const registerUserResponse = await UserClass.registerUser({
      email,
      password,
      username,
      birthday,
      sex,
      favoritBand
    });

    res.status(200).json(registerUserResponse);
  } catch (error) {
    next(error);
  }
};
