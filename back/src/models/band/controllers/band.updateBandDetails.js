const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.headers.authorization;
    const { details} = req.body;

    /*
    await BandClass.validNewCleanBand({
        details,
    //    location,
    //    members,
    });
    */

    const band = await BandClass.updateBandDetaills({bandId:id,details});

    res.status(200).json(band);

  } catch (error) {
    next(error);
  }
};

