const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.headers.authorization;
    
    const concerts = await ConcertClass.getConcerts();

    res.status(200).json(concerts);
  } catch (error) {
    next(error);
  }
};
