const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    //const { bandId } = req.params;
    const { id } = req.headers.authorization;

    const { logo } = req.body;

    if (logo != undefined && logo != null ) {
        let band = await BandClass.updateLogoBand({bandId:id,logo});
        res.status(200).json(band);
    }else{
        throw new Error("photo is undefined")
    }


  } catch (error) {
    next(error);
  }
};

