const Middleware = require('./../../../server/middleware/middleware');

global.__expressServer
  .route('/user/login')
  .post(require('./controllers/user.login'), Middleware.routeException);

global.__expressServer
  .route('/user/register')
  .post(require('./controllers/user.register'), Middleware.routeException);

global.__expressServer
  .route('/user')
  .get(
    Middleware.tokenCheck,
    require('./controllers/user.getOwnProfile'),
    Middleware.routeException
  )

global.__expressServer
  .route('/user/tickets')
  .get(
    Middleware.tokenCheck,
    require('./controllers/user.getpurchasedTickets'),
    Middleware.routeException
  )

// associar um concert a um usuário
global.__expressServer
  .route('/user/tickets')
  .post( Middleware.tokenCheck,require('./controllers/user.setPurchasedTicket'), Middleware.routeException);


  

global.__expressServer
  .route('/user/follow/band/:bandId')
  .post( Middleware.tokenCheck,require('./controllers/user.followBand'), Middleware.routeException);



//   .patch(
//     Middleware.tokenCheck,
//     require('./controllers/user.updateOwnProfile'),
//     Middleware.routeException
//   );

// global.__expressServer
//   .route('/profile/avatar')
//   .patch(
//     Middleware.tokenCheck,
//     global
//       .__multer({ dest: `${global.__sourcePath}/modules/user/uploads/avatar/` })
//       .single('avatar'),
//     require('./controllers/user.updateOwnProfileAvatar'),
//     Middleware.routeException
//   );