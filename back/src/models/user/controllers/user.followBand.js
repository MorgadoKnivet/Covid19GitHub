const BandClass = require('../../band/band');
const UserClass = require('../user')

module.exports = async (req, res, next) => {
  try {

    const { bandId } = req.params;
    const { status } = req.body;
    const { id } = req.headers.authorization;

    console.log("status ",req.body)
   
    if (status === true) {
      const user = await UserClass.setFollowsBands({bandId,userId:id})

      const band = await BandClass.setFollow({bandId,userId:id});

      res.status(200).json({
        user,
        band
      });

    }else{

      const user = await UserClass.removeFollowsBands({bandId,userId:id})

      const band = await BandClass.removeFollow({bandId,userId:id});

      res.status(200).json({
        user,
        band
      });

    }
    /**/
  } catch (error) {
    next(error);
  }

};
