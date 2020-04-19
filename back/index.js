global.__sourcePath = __dirname;

require('./src/database/database').connectMongoDB();
require('./src/models/user/user.model').modelDatabase();
require('./src/models/concert/concert.model').modelDatabase();
require('./src/models/band/band.model').modelDatabase();

require('./server/server');