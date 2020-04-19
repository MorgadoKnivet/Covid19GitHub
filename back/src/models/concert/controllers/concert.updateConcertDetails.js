const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { idConcert } = req.params;

    const {
      title,
      concertPhoto,
      description,
      date,
      estimatedDuration,
      setlist
    } = req.body;

    await ConcertClass.updateConcertDetails(idConcert, id, { 
      title,
      concertPhoto,
      description,
      date,
      estimatedDuration,
      setlist
    });

    res.status(201).json();
  } catch (error) {
    next(error);
  }
};
