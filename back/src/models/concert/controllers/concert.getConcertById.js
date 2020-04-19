const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.headers.authorization;
    const {concertId} = req.params
    
    const concert = await ConcertClass.getConcertById({concertId});

    res.status(200).json(concert);
  } catch (error) {
    next(error);
  }
};
