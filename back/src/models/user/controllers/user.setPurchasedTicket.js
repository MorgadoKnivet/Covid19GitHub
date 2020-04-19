const BandClass = require('../../band/band');

const UserClass = require('../user')

module.exports = async (req, res, next) => {
  try {

    const { showId,whenPurchased } = req.body;
    const { id } = req.headers.authorization;


    await UserClass.validateTicket({showId,whenPurchased})

    let response = await UserClass.addPurchasedTicket({showId,whenPurchased,userId:id})
 

    res.status(200).json(response);

  } catch (error) {
    next(error);
  }

};
