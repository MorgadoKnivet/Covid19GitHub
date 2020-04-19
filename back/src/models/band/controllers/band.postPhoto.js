const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    //const { bandId } = req.params;
    const { id } = req.headers.authorization;

    const { photo } = req.body;

    if (photo != undefined && photo != null ) {
        let band = await BandClass.updatePhotoBand({bandId:id,photo});
        res.status(200).json(band);
    }else{
        throw new Error("photo is undefined")
    }


  } catch (error) {
    next(error);
  }
};

