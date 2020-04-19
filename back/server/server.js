const Express = require('express');
const BodyParser = require('body-parser');
const Helmet = require('helmet');
const Cors = require('cors');
const Multer = require('multer');
const Middleware = require('./middleware/middleware');

// EXPRESS instância
global.__expressServer = Express();
global.__multer = Multer;

// EXPRESS configuração
global.__expressServer.use(BodyParser.json({ limit: '50mb' }));
global.__expressServer.use(
  BodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);
global.__expressServer.use(BodyParser());
global.__expressServer.use(Helmet());
global.__expressServer.use(Cors());
global.__expressServer.use(Middleware.routeException);

// EXPRESS rotas
require('./../src/models/user/user.routing');
require('./../src/models/band/band.routing')
require('./../src/models/concert/concert.routing');

// EXPRESS iniciar servidor
global.__expressServer.listen(49160, () => {
  console.log(`Server online on port ${49160}`);
});
