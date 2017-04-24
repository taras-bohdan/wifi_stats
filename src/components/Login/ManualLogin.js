import React, {Component} from 'react';
import isEqual from 'lodash.isequal';
import {SERVER_HOST} from '../../../config';

class ManualLogin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAge: '',
			selectedGender: '',
			ageNotSelected: false,
			genderNotSelected: false
		};
	}

	/**
	 * update state on age selection
	 * @param e
	 */
	setAge(e) {
		this.setState({selectedAge: e.target.value});
	};

	/**
	 * update state on gender selection
	 * @param e
	 */
	setGender(e) {
		this.setState({selectedGender: e.target.value});
	};


	login() {
		this.setState({
			ageNotSelected: isEqual(this.state.selectedAge, ''),
			genderNotSelected: isEqual(this.state.selectedGender, '')
		});

		if(this.state.selectedAge && this.state.selectedGender){
			this.sendUserInfo({
				name: 'NA',
				age: this.state.selectedAge,
				sex: this.state.selectedGender,
				birthday: 'NA',
				location: 'NA'
			})
		}
	};

	sendUserInfo(userInfo) {
		fetch(SERVER_HOST + '/user', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userInfo)
		})
			.then(response => console.log(response.message))
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
				{this.state.genderNotSelected ?
					<div className="not-selected-info gender">Стать не було вибрано</div> : null}
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
				{this.state.ageNotSelected ? <div className="not-selected-info age">Вік не було вибрано</div> : null}
				<div className="button-login" onClick={this.login.bind(this)}>Увійти</div>
			</div>
		)
	}
}


export default ManualLogin;