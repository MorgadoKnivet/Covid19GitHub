const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    //const { bandId } = req.params;
    const { id } = req.headers.authorization;

//const { photo } = req.body;

    let band = await BandClass.deletePhotoBand({bandId:id});
    res.status(200).json(band);


  } catch (error) {
    next(error);
  }
};

