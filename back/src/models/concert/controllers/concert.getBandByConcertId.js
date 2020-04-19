const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.headers.authorization;
    const {concertId} = req.params
    
    const band = await ConcertClass.getBandByConcertId({concertId});

    res.status(200).json(band);
  } catch (error) {
    next(error);
  }
};
