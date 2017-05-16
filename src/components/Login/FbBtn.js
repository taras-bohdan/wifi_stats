import React, {Component} from 'react';
import {FB_OPTIONS} from '../../../config';
import isUndefined from 'lodash.isundefined';

class FbBtn extends Component {
	login() {
		const redirectData = this.props.redirectData;
		FB.getLoginStatus(function (response) {
			if (response.status === 'connected') {
				console.log('Logged in.');
				const userInfo = getUserInfo();
				console.log(redirectData);
			}
			else {
				FB.login(response => {
					if (response.authResponse) {
						console.log('Welcome!  Fetching your information.... ');
						//get user data
						const userInfo = getUserInfo();
						console.log(redirectData);
					} else {
						console.log('User cancelled login or did not fully authorize.');
					}
				});
			}
		});
	}

	componentDidMount() {
		window.fbAsyncInit = function () {
			FB.init({
				appId: FB_OPTIONS.appId,
				xfbml: true,
				version: 'v2.9'
			});
			FB.AppEvents.logPageView();
		};
		(function (d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {
				return;
			}
			js = d.createElement(s);
			js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}

	render() {
		return (
			<div className="button-login" onClick={this.login.bind(this)}>
				<img className="button-icon" src="/img/fb_img.png"></img>
				Увійти через Facebook
			</div>
		)
	}
}

function getUserInfo() {
	FB.api('/me', {
		fields: ['id', 'cover', 'name', 'first_name', 'last_name', 'age_range', 'link', 'gender', 'locale',
			'picture', 'timezone', 'updated_time', 'verified']
	}, function (response) {
		//add user info into DB
		const userInfo = {
			name: isUndefined(response.name) ? 'NA' : response.name,
			sex: isUndefined(response.gender) ? 'NA' : response.gender,
			birthday: isUndefined(response.birthday) ? 'NA' : response.birthday,
			location: isUndefined(response.location) ? 'NA' : response.location.name
		};

		const ageRange = response.age_range;
		if (isUndefined(ageRange.min) && !isUndefined(ageRange.max)) {
			userInfo.age = '<18';
		} else if (!isUndefined(ageRange.min) && !isUndefined(ageRange.max)) {
			userInfo.age = '18-21'; //18-21
		} else if (!isUndefined(ageRange.min) && isUndefined(ageRange.max)) {
			userInfo.age = '21+'; //21+
		}

		console.log(userInfo);
	});
}

export default FbBtn;