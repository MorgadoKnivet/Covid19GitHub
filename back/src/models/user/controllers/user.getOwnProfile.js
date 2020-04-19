const UserClass = require('../user');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    // Recuperar perfil do usuario
    const {
      _id,
      email,
      username,
      birthday,
      sex,
      favoritBand,
      profilePictureUrl
    } = await UserClass.retrieveUserById(id);

    res.status(200).json({
      _id,
      email,
      username,
      birthday,
      sex,
      favoritBand,
      profilePictureUrl
    });
  } catch (error) {
    next(error);
  }
};
