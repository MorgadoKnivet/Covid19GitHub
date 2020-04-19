const Middleware = require('./../../../server/middleware/middleware');


global.__expressServer
  .route('/band/register')
  .post(require('./controllers/band.register'), Middleware.routeException);

global.__expressServer
  .route('/band/login')
  .post(require('./controllers/band.login'), Middleware.routeException);

global.__expressServer
  .route('/band/:bandId')
  .get(require('./controllers/band.getBand'), Middleware.routeException);

global.__expressServer
  .route('/bands')
  .get(require('./controllers/band.getBands'), Middleware.routeException);

global.__expressServer
  .route('/band')
  .put(Middleware.tokenCheck,require('./controllers/band.updateBand'), Middleware.routeException);

global.__expressServer
  .route('/band/details')
  .put(Middleware.tokenCheck,require('./controllers/band.updateBandDetails'), Middleware.routeException);

global.__expressServer
  .route('/band/:bandId/concerts/')
  .get(Middleware.tokenCheck, require('./controllers/band.getConcerts'), Middleware.routeException);

global.__expressServer
  .route('/band/:bandId/concerts/')
  .get(Middleware.tokenCheck, require('./controllers/band.getConcerts'), Middleware.routeException);


global.__expressServer
  .route('/band/photo')
  .post(Middleware.tokenCheck, require('./controllers/band.postPhoto'), Middleware.routeException);

global.__expressServer
  .route('/band/photo')
  .delete(Middleware.tokenCheck, require('./controllers/band.deletePhoto'), Middleware.routeException);

  global.__expressServer
  .route('/band/logo')
  .post(Middleware.tokenCheck, require('./controllers/band.postPhoto'), Middleware.routeException);

  global.__expressServer
  .route('/band/logo')
  .delete(Middleware.tokenCheck, require('./controllers/band.deleteLogo'), Middleware.routeException);

