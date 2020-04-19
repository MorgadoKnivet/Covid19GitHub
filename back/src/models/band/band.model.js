const Database = require('../../database/database');

const modelDatabaseName = 'bands';

module.exports.modelDatabaseName = modelDatabaseName;

module.exports.modelDatabase = () => {
  Database.createModel(modelDatabaseName, {
    email: 'string',
    password: 'string',
    salt: 'string',
    details: {
        biography: 'string',
        photo: 'string',
        logo: 'string',
        name: 'string',
        foundationDate: 'string' // 'timestamp'
    },
    location: {
        city: 'string',
        state:'string',
        country: 'string',
    },
    members: [{
        name: 'string',
        instrument: 'string'
    }],
    followersNumber: 'number',
    followers: [{
      userId: 'string',      
    }]
  });
};
