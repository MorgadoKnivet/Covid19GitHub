const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId } = req.params;

    const {image,sound,band} = req.body;
    
    await ConcertClass.validateCleanReview({image,sound,band });

    let concert = await ConcertClass.postReviewById({concertId,image,sound,band,userId:id});

    res.status(200).json(concert);
    
  } catch (error) {
    next(error);
  }
};
