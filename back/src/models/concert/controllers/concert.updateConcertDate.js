const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    // Recuperar dados do auth
    const { id } = req.headers.authorization;

    const { concertId } = req.params;

    const {date} = req.body;

    if (date == undefined ) {
        throw new Error("concertDetails não existe")
    }

    let concert = await ConcertClass.updateConcertDate({concertId,date});

    res.status(200).json(concert);
  } catch (error) {
    next(error);
  }
};
