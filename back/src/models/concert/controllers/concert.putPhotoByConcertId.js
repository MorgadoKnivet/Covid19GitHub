const ConcertClass = require('../concert');

module.exports = async (req, res, next) => {
  try {
    //const { bandId } = req.params;
    const { id } = req.headers.authorization;

    const { photo } = req.body;

    if (photo != undefined && photo != null ) {
        let band = await ConcertClass.updatePhotoBand({concertId:id,photo});
        res.status(200).json(band);
    }else{
        throw new Error("photo is undefined")
    }

  } catch (error) {
    next(error);
  }
};

