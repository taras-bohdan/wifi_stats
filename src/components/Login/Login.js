import React, {Component} from 'react';
import LoginFormContainer from './LoginForm.container';
import styles from './Login.styles.scss';

class Login extends Component {
	render() {
		return (
			<div className={styles.loginContainer}>
				<LoginFormContainer/>
			</div>
		)
	}
}

export default Login;