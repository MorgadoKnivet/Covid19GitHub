const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    const { email, password, foundationDate, name, segment } = req.body;

    // Verificar se usuário a ser cadastrado é válido
    await BandClass.validNewCleanBand({
      email,
      password, 
      foundationDate,
      name,
      segment
    });

    const registerBandResponse = await BandClass.registerBand({
      email,
      password, 
      foundationDate,
      name,
      segment
    });

    res.status(200).json(registerBandResponse);
  } catch (error) {
    next(error);
  }
};
