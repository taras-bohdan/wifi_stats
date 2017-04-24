const Step = require('step');
const FB = require('fb');
const config = require('../../config');
const {addUserInfoToDB} = require('../db/dbConnector');


FB.options(config.FB_OPTIONS);

const FB_LOGIN_URL = FB.getLoginUrl({
	scope: 'public_profile,user_birthday',
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
				fields: 'name,birthday,gender,location'
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
						name: result.name,
						sex: result.gender,
						birthday: result.birthday,
						location: result.location.name,
						age: result.birthday ? new Date().getYear() - new Date(result.birthday).getYear() : 'NA'
					};
					console.log(result);
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