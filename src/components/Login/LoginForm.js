import React, {Component} from 'react';
import FbBtn from './FbBtn';
import VkBtn from './VkBtn';
import ManualLogin from './ManualLogin'

class LoginForm extends Component {
	render() {
		return (<div className="login-form">
			<FbBtn/>
			<VkBtn/>
			<ManualLogin/>
		</div>)
	}
}

export default LoginForm;