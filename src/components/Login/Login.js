import React, {Component} from 'react';
import FbBtn from './FbBtn';
import VkBtn from './VkBtn';
import ManualLogin from './ManualLogin'

class Login extends Component {
	render() {
		return (
			<div className="login-container">
				<FbBtn/>
				<VkBtn/>
				<ManualLogin/>
			</div>
		)
	}
}

export default Login;