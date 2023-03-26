import api from './startup/api';
import db from './startup/db';

// Setup and use web server to handle API connections
api.initApi();

// Setup DB connection and import default data
db.initDb();