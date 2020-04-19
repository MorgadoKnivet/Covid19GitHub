const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    const { bandId } = req.params;
    
    const band = await BandClass.getBand({bandId});

    res.status(200).json(band);
  } catch (error) {
    next(error);
  }
};
