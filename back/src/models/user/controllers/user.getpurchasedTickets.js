const UserClass = require('../user');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    // Recuperar perfil do usuario
    const {
      purchasedTickets
    } = await UserClass.retrieveUserById(id);

    res.status(200).json({
      purchasedTickets
    });
  } catch (error) {
    next(error);
  }
};
