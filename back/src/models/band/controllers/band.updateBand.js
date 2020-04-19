const BandClass = require('../band');

module.exports = async (req, res, next) => {
  try {
    //const { bandId } = req.params;
    const { id } = req.headers.authorization;

    const { details, location, members } = req.body;

    /*
    await BandClass.validNewCleanBand({
      details,
      location,
      members,
    });
    */

    const band = await BandClass.updateBand({bandId:id,details,location,members});

    res.status(200).json(band);

  } catch (error) {
    next(error);
  }
};

