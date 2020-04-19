const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { 
      bandId,
      ticketPrice,
      title,
      locationName,
      concertPhoto
     } = req.body;

    // Registrar novo show
    const registerConcertResponse = await ConcertClass.registerConcert({ 
      bandId: id,
      ticketPrice,
      title,
      locationName,
      concertPhoto
    });

    res.status(200).json(registerConcertResponse);
  } catch (error) {
    next(error);
  }
};
