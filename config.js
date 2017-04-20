const isEqual = require('lodash.isequal');

const isProduction = isEqual(process.env.NODE_ENV, 'production');

export const PORT = process.env.PORT || 8080;
export const DB_URL = isProduction ? 'mongodb://db_admin:123qwe@ds123080.mlab.com:23080/heroku_k2k6l934' :
	'mongodb://localhost:27017/wifi_statistics';

export const SERVER_HOST = isProduction ? 'https://wifi-stats.herokuapp.com' : 'http://localhost:' + PORT;

//facebook configurations

export const FB_REDIRECT_URL = SERVER_HOST + '/fbLoginSuccess';
export const FB_OPTIONS = {
	appId: 1837990633109597,
	appSecret: '51931bf0757480210a45125e61e175e1',
	redirectUri: FB_REDIRECT_URL,
	version: 'v2.8'
};