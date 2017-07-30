import React, {Component} from 'react';
import LoginFormContainer from './LoginForm.container'

class Login extends Component {
	render() {
		return (
			<div className="login-container">
				<LoginFormContainer/>
			</div>
		)
	}
}

export default Login;