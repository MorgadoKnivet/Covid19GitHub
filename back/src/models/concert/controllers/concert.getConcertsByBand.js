const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.headers.authorization;

    
    //const band = await ConcertClass.getConcertsByBand();

    console.log("id ",id)

    res.status(200).json({id});
  } catch (error) {
    next(error);
  }
};
