import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ManualLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAge: '',
			selectedGender: '',
			ageSelected: false,
			genderSelected: false,
			redirectData: props.redirectData
		};
	}

	/**
	 * update state on age selection
	 * @param e
	 */
	setAge(e) {
		this.setState({selectedAge: e.target.value, ageSelected: true});
	}

	/**
	 * update state on gender selection
	 * @param e
	 */
	setGender(e) {
		this.setState({selectedGender: e.target.value, genderSelected: true});
	}


	login() {
		this.props.onUserLogin(this.state);
	}

	sendUserInfo(userInfo, link) {
		postAjax('/addUser', userInfo, () => {
			window.location.href = link;
		})
	}

	render() {
		return (
			<div className="manual-login">
				<div className="user-info-select">
					<label name="select-label" htmlFor="gender">Ваша стать:</label>
					<select id="gender" onChange={this.setGender.bind(this)}>
						<option defaultValue="true" disabled="">Виберіть стать</option>
						<option value="male">Чол.</option>
						<option value="female">Жін.</option>
					</select>
				</div>
				<div className="user-info-select">
					<label className="select-label" htmlFor="age">Ваш вік:</label>
					<select id="age" onChange={this.setAge.bind(this)}>
						<option defaultValue="true" disabled="">Виберіть вік</option>
						<option value="<18">&lt;18</option>
						<option value="18-25">18-25</option>
						<option value="25-50">25-50</option>
						<option value=">50">&gt;50</option>
					</select>
				</div>
				{this.state.genderSelected && this.state.ageSelected ?
					<div className="button-login" onClick={this.login.bind(this)}>Увійти</div> : null}
			</div>
		)
	}
}

ManualLogin.propTypes = {
	redirectData: PropTypes.object,
	onUserLogin: PropTypes.func
};

function postAjax(url, data, success) {
	var params = typeof data == 'string' ? data : Object.keys(data).map(
		function (k) {
			return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
		}
	).join('&');

	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : window.ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('POST', url);
	xhr.onreadystatechange = function () {
		if (xhr.readyState > 3 && xhr.status == 200) {
			success(xhr.responseText);
		}
	};
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.send(params);
	return xhr;
}

export default ManualLogin;