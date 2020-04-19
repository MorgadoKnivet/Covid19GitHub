const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.headers.authorization;
    const {bandId} = req.params;
 

    const concerts = await BandClass.getConcertsByBand({bandId});

    res.status(200).json(concerts);
  } catch (error) {
    next(error);
  }
};
