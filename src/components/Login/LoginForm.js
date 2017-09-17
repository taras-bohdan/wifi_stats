import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ManualLogin from './ManualLogin';
import styles from './Login.styles.scss';

class LoginForm extends Component {
	render() {
		return (<div className={styles.loginForm}>
			<div className={styles.loginInformation}>
				Для того, щоб продовжити вкажіть ваш вік і стать
			</div>
			<ManualLogin onUserLogin={this.props.onUserLogin} redirectData={this.props.redirectData}/>
			{this.props.redirectData &&
			<RedirectForm redirectData={this.props.redirectData}/>
			}
		</div>)
	}
}

function RedirectForm(props) {
	return (
		<form id="redirect-form" name="redirect" action="http://localhost:8080/login" method="post">
			<input type="hidden" name="mac" value={props.redirectData.mac}/>
			<input type="hidden" name="ip" value={props.redirectData.ip}/>
			<input type="hidden" name="username" value={props.redirectData.username}/>
			<input type="hidden" name="link-login" value={props.redirectData.linkLogin}/>
			<input type="hidden" name="link-orig" value={props.redirectData.linkOrig}/>
			<input type="hidden" name="error" value={props.redirectData.error}/>
			<input type="hidden" name="trial" value={props.redirectData.trial}/>
			<input type="hidden" name="chap-id" value={props.redirectData.chapId}/>
			<input type="hidden" name="chap-challenge" value={props.redirectData.chapChallenge}/>
			<input type="hidden" name="link-login-only" value={props.redirectData.linkLoginOnly}/>
			<input type="hidden" name="link-orig-esc" value={props.redirectData.linkOrigEsc}/>
			<input type="hidden" name="mac-esc" value={props.redirectData.macEsc}/>
			<input type="hidden" name="identity" value={props.redirectData.identity}/>
			<input type="hidden" name="bytes-in-nice" value={props.redirectData.bytesInNice}/>
			<input type="hidden" name="bytes-out-nice" value={props.redirectData.bytesOutNice}/>
			<input type="hidden" name="session-time-left" value={props.redirectData.sessionTimeLeft}/>
			<input type="hidden" name="uptime" value={props.redirectData.uptime}/>
			<input type="hidden" name="refresh-timeout" value={props.redirectData.refreshTimeout}/>
			<input type="hidden" name="link-status" value={props.redirectData.linkStatus}/>
			<input type="submit" value="continue"/>
		</form>
	)
}

LoginForm.propTypes = {
	redirectData: PropTypes.object,
	onUserLogin: PropTypes.func
};

RedirectForm.propTypes = {
	redirectData: PropTypes.object
};

export default LoginForm;