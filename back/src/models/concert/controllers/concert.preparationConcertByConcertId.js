const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId } = req.params;

    let concert = await ConcertClass.preparationConcertByConcertId({concertId});

    res.status(200).json(concert);
  
} catch (error) {
    next(error);
  }
};
