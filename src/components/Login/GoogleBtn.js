import React, {Component} from 'react';

class GoogleBtn extends Component {
	constructor(props) {
		super(props);
	}

	/*componentDidMount() {
		gapi.signin2.render('g-signin2', {
			'scope': 'https://www.googleapis.com/auth/plus.login',
			'width': 200,
			'height': 50,
			'longtitle': true,
			'theme': 'dark',
			'onsuccess': this.onSignIn
		});
	}*/

	onSignIn(googleUser) {
		var profile = googleUser.getBasicProfile();
		console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
		console.log('Name: ' + profile.getName());
		console.log('Image URL: ' + profile.getImageUrl());
		console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	}

	render() {
		return (
			<div className='g-signin2' data-onsuccess={this.onSignIn}></div>
		)
	}
}

const clientID = '82541447418-nu74mg8vgk1sr8ovekm3df513lm94u45.apps.googleusercontent.com';
const secret = 'OUdbMW7Uc31_0YdqdLjaytPM';

export default GoogleBtn;