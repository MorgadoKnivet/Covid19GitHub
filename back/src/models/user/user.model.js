const Database = require('./../../database/database');

const modelDatabaseName = 'users';

module.exports.modelDatabaseName = modelDatabaseName;

module.exports.modelDatabase = () => {
  Database.createModel(modelDatabaseName, {
    email: 'string',
    password: 'string',
    salt: 'string',
    username: 'string',
    birthday: 'string',
    sex: 'string',
    favoritBand: 'string',
    profilePictureUrl: 'string',
    purchasedTickets: [{
      showId: 'string',
      whenPurchased: 'string' //TIMESTAMP
    }],
    followersNumber: 'number',
    followsBands: [{
      bandId: 'string'
    }]
  });
};
