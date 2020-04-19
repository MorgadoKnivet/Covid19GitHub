const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId } = req.params;

    const  {position,name,start,duration} = req.body;

    let concert = await ConcertClass.postSetList({concertId,position,name,start,duration});

    res.status(200).json(concert.concertDetails.setlist );
  } catch (error) {
    next(error);
  }
};
