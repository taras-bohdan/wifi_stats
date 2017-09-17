import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from './Login.styles.scss';

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

	render() {
		return (
			<div className={styles.manualLogin}>
				<div className={styles.userInfoSelect}>
					<label name="select-label" htmlFor="gender">Ваша стать:</label>
					<select id="gender" onChange={this.setGender.bind(this)}>
						<option defaultValue="true" disabled="">Виберіть стать</option>
						<option value="male">Чол.</option>
						<option value="female">Жін.</option>
					</select>
				</div>
				<div className={styles.userInfoSelect}>
					<label className={styles.selectLabel} htmlFor="age">Ваш вік:</label>
					<select id="age" onChange={this.setAge.bind(this)}>
						<option defaultValue="true" disabled="">Виберіть вік</option>
						<option value="<18">&lt;18</option>
						<option value="18-25">18-25</option>
						<option value="25-50">25-50</option>
						<option value=">50">&gt;50</option>
					</select>
				</div>
				<div className={this.state.genderSelected && this.state.ageSelected ? styles.buttonLoginActive : styles.buttonLogin} onClick={this.login.bind(this)}>Увійти</div>
			</div>
		)
	}
}

ManualLogin.propTypes = {
	redirectData: PropTypes.object,
	onUserLogin: PropTypes.func
};

export default ManualLogin;