import React, {Component, PropTypes} from 'react';
import isEqual from 'lodash.isequal';
import isUndefined from 'lodash.isundefined';

class ManualLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAge: '',
			selectedGender: '',
			ageSelected: false,
			genderSelected: false
		};
	}

	/**
	 * update state on age selection
	 * @param e
	 */
	setAge(e) {
		this.setState({selectedAge: e.target.value, ageSelected: true});
	};

	/**
	 * update state on gender selection
	 * @param e
	 */
	setGender(e) {
		this.setState({selectedGender: e.target.value, genderSelected: true});
	};


	login() {
		let link = '/';
		if (!isUndefined(this.props.redirectData)) {
			const linkLoginOnly = this.props.redirectData.linkLoginOnly,
				dst = this.props.redirectData.linkOrigEsc,
				userName = 'T-' + this.props.redirectData.macEsc;
			link = linkLoginOnly + '?dst=' + dst + '&username=' + userName;
		}

		this.setState({
			ageSelected: isEqual(this.state.selectedAge, ''),
			genderSelected: isEqual(this.state.selectedGender, '')
		});

		if (this.state.selectedAge && this.state.selectedGender) {
			this.sendUserInfo({
				name: 'NA',
				age: this.state.selectedAge,
				sex: this.state.selectedGender,
				birthday: 'NA',
				location: 'NA'
			}, link)
		}
	};

	sendUserInfo(userInfo, link) {
		fetch('/addUser', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo)
		})
			.then(response => {
				console.log(response.message);
				window.location.href = link;
			})
			.catch(error => console.error(error))
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
	redirectData: PropTypes.object
};


export default ManualLogin;