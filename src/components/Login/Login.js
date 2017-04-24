import React, {Component} from 'react';
import FbBtn from './FbBtn';
import VkBtn from './VkBtn';
import ManualLogin from './ManualLogin'

class Login extends Component {
	render() {
		return (
			<div className="login-container">
				<div className="login-form">
					<FbBtn/>
					<VkBtn/>
					<ManualLogin/>
				</div>
			</div>
		)
	}
}

export default Login;