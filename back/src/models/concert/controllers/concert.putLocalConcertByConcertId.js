const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId } = req.params;

    const {name,address,geolocation} = req.body;

    let concert = await ConcertClass.putLocalConcertByConcertId({concertId,name,address,geolocation});

    res.status(200).json(concert);
    
  } catch (error) {
    next(error);
  }
};
