const Middleware = require('../../../server/middleware/middleware');

global.__expressServer
  .route('/concert/register')
  .post(
    Middleware.tokenCheck,
    require('./controllers/concert.register'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concert/:idConcert/details')
  .patch(
    Middleware.tokenCheck,
    require('./controllers/concert.updateConcertDetails'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concert/:idConcert/details')
  .patch(
    Middleware.tokenCheck,
    require('./controllers/concert.updateConcertDetails'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concert/:concertId')
  .get(
    Middleware.tokenCheck,
    require('./controllers/concert.getConcertById'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concerts')
  .get(
    Middleware.tokenCheck,
    require('./controllers/concert.getConcerts'),
    Middleware.routeException
  );




global.__expressServer
  .route('/concert/band')
  .get(
    Middleware.tokenCheck,
    require('./controllers/concert.getConcertsByBand'),
    Middleware.routeException
  );


global.__expressServer
.route('/concert/:concertId/band')
.get(
  Middleware.tokenCheck,
  require('./controllers/concert.getBandByConcertId.js'),
  Middleware.routeException
);



global.__expressServer
  .route('/concert/:concertId/date')
  .put(
    Middleware.tokenCheck,
    require('./controllers/concert.updateConcertDate'),
    Middleware.routeException
  );


global.__expressServer
  .route('/concert/:concertId/review')
  .post(
    Middleware.tokenCheck,
    require('./controllers/concert.postReviewByConcertId'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concert/:concertId/review')
  .get(
    Middleware.tokenCheck,
    require('./controllers/concert.getReviewByConcertId'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concert/:concertId/setList')
  .post(
    Middleware.tokenCheck,
    require('./controllers/concert.setSetListByConcertId'),
    Middleware.routeException
  );

global.__expressServer
  .route('/concert/:concertId/setList/:musicId')
  .delete(
    Middleware.tokenCheck,
    require('./controllers/concert.deleteMusicSetListByConcertId'),
    Middleware.routeException
  );

  global.__expressServer
  .route('/concert/:concertId/start')
  .put(
    Middleware.tokenCheck,
    require('./controllers/concert.startConcertByConcertId'),
    Middleware.routeException
  );

  global.__expressServer
  .route('/concert/:concertId/finish')
  .put(
    Middleware.tokenCheck,
    require('./controllers/concert.finishConcertByConcertId'),
    Middleware.routeException
  );


  global.__expressServer
  .route('/concert/:concertId/preparation')
  .put(
    Middleware.tokenCheck,
    require('./controllers/concert.preparationConcertByConcertId'),
    Middleware.routeException
  );

  global.__expressServer
  .route('/concert/:concertId/local')
  .put(
    Middleware.tokenCheck,
    require('./controllers/concert.putLocalConcertByConcertId'),
    Middleware.routeException
  );

  global.__expressServer
  .route('/concert/:concertId/concertPhoto')
  .put(Middleware.tokenCheck, require('./controllers/concert.putPhotoByConcertId'), Middleware.routeException);

/*

  {
          position:'number',
          name:'string',
          start: 'string',
          duration: 'string'
        }
*/

