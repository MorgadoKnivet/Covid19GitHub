const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId } = req.params;

    let concertReview = await ConcertClass.getReviewById({concertId});

    res.status(200).json(concertReview);
    
  } catch (error) {
    next(error);
  }
};
