const Database = require('../../database/database');

const modelDatabaseName = 'concerts';

module.exports.modelDatabaseName = modelDatabaseName;

module.exports.modelDatabase = () => {
  Database.createModel(modelDatabaseName, {
    bandId: 'string', //ID
    streamURL: 'string',
    ticketPrice: 'number',
    bandDetails: {
      bandPhoto: 'string',
      bandPhaseToday: 'string',
      album: {
        tourDescription: 'string',
        tourPhoto: 'string'
      }
    },
    concertDetails: {
      title: 'string',
      concertPhoto: 'string',
      description: 'string',
      date: 'string', //TIMESTAMP
      estimatedDuration: 'string',
      setlist: [
        {
          position:'number',
          name:'string',
          start: 'string',
          duration: 'string'
        }
      ]
    },
    location: {
      name: 'string',
      address: 'string',
      geolocation: {
        lat: 'string',
        lng: 'string'
      },
    },
    ticketsSold: 'number',
    concertUnderPreparation: 'boolean',
    concertLive: 'boolean',
    concertCompleted: 'boolean',
    reviews: {
      reviewCount: 'number',
      score: 'number',
      userReview: [
        {
          userId: 'string',
          when: 'string', //TIMESTAMP
          imageScore: 'number',
          soundScore: 'number',
          bandScore: 'number'
        }
      ],
      imageReview: {
        score: 'number',
        '5': 'number',
        '4': 'number',
        '3': 'number',
        '2': 'number',
        '1': 'number'
      },
      soundReview: {
        score: 'number',
        '5': 'number',
        '4': 'number',
        '3': 'number',
        '2': 'number',
        '1': 'number'
      },
      bandReview: {
        score: 'number',
        '5': 'number',
        '4': 'number',
        '3': 'number',
        '2': 'number',
        '1': 'number'
      }
    }
    
  });
};
