const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId,musicId } = req.params;

    let concert = await ConcertClass.deleteMusicSetListByConcertId({concertId,musicId});

    res.status(200).json(concert.concertDetails.setlist );
    
  } catch (error) {
    next(error);
  }
};
