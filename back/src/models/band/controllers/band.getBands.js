const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    
    const band = await BandClass.getBands();
 
    res.status(200).json(band);
  } catch (error) {
    next(error);
  }
};
