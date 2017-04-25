const Step = require('step');
const FB = require('fb');
const config = require('../../config');
const {addUserInfoToDB} = require('../db/dbConnector');
const isUndefined = require('lodash.isundefined');


FB.options(config.FB_OPTIONS);

const FB_LOGIN_URL = FB.getLoginUrl({
	scope: 'public_profile',
	redirect_uri: config.FB_REDIRECT_URL,
	responseType: 'code'
});

exports.loginCallBack = (req, res, next) => {
	var code = req.query.code;

	if (req.query.error) {
		// user might have disallowed the app
		return res.send('login-error ' + req.query.error_description);
	} else if (!code) {
		return res.redirect('/');
	}

	Step(
		function exchangeCodeForAccessToken() {
			FB.napi('oauth/access_token', {
				client_id: FB.options('appId'),
				client_secret: FB.options('appSecret'),
				redirect_uri: FB.options('redirectUri'),
				code: code
			}, this);
		},
		function extendAccessToken(err, result) {
			if (err) throw(err);
			FB.napi('oauth/access_token', {
				client_id: FB.options('appId'),
				client_secret: FB.options('appSecret'),
				grant_type: 'fb_exchange_token',
				fb_exchange_token: result.access_token
			}, this);
		},
		function (err, result) {
			if (err) return next(err);

			let accessToken = result.access_token;

			FB.api('/me', {
				access_token: accessToken,
				fields: 'id,cover,name,first_name,last_name,age_range,link,gender,locale,picture,timezone,updated_time,verified'
			}, function (result) {
				if (result && result.error) {
					if (result.error.code === 'ETIMEDOUT') {
						console.log('request timeout');
					}
					else {
						console.log('error', result.error);
					}
				}
				else {
					//add user info into DB
					const userInfo = {
						name: isUndefined(result.name) ? 'NA' : result.name,
						sex: isUndefined(result.gender) ? 'NA' : result.gender,
						birthday: isUndefined(result.birthday) ? 'NA' : result.birthday,
						location: isUndefined(result.location) ? 'NA' : result.location.name
					};

					const ageRange = result.age_range;
					if (isUndefined(ageRange.min) && !isUndefined(ageRange.max)) {
						userInfo.age = '<18';
					} else if (!isUndefined(ageRange.min) && !isUndefined(ageRange.max)) {
						userInfo.age = '18-21'; //18-21
					} else if (!isUndefined(ageRange.min) && isUndefined(ageRange.max)) {
						userInfo.age = '21+'; //21+
					}

					// console.log(result);
					addUserInfoToDB(userInfo, () => {
						res.redirect('/');
					});
				}
			});
		}
	);
};

exports.login = (req, res) => {
	res.redirect(FB_LOGIN_URL);
};