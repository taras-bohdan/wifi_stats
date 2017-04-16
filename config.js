const isEqual = require('lodash.isequal');

export const PORT = process.env.PORT || 8080;
export const DB_URL = isEqual(process.env.NODE_ENV, 'production') ? 'mongodb://db_admin:123qwe@ds123080.mlab.com:23080/heroku_k2k6l934' :
	'mongodb://localhost:27017/wifi_statistics';

export const SERVER_HOST = 'http://localhost:' + PORT;