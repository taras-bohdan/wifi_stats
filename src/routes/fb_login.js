const Step = require('step');
const FB = require('fb');

const FB_OPTIONS = {
	appId: 1837990633109597,
	appSecret: '51931bf0757480210a45125e61e175e1',
	redirectUri: 'http://localhost:8080/fbLoginSuccess',
	version: 'v2.8'
};

FB.options(FB_OPTIONS);

const FB_LOGIN_URL = FB.getLoginUrl({
	scope: 'email,user_likes',
	// redirect_uri: 'http://localhost:8080/login',
	redirect_uri: 'http://localhost:8080/fbLoginSuccess',
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
			let expires = result.expires ? result.expires : 0;

			FB.api('/me', {access_token: accessToken}, function (res) {
				if (res && res.error) {
					if (res.error.code === 'ETIMEDOUT') {
						console.log('request timeout');
					}
					else {
						console.log('error', res.error);
					}
				}
				else {
					console.log(res);
				}
			});
		}
	);
};

exports.login = (req, res) => {
	res.redirect(FB_LOGIN_URL);
};