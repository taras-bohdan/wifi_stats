import React, {Component} from 'react';
import FbBtn from './FbBtn';
import VkBtn from './VkBtn';
import ManualLogin from './ManualLogin'

class LoginForm extends Component {
	render() {
		return (<div className="login-form">
			<FbBtn redirectData={this.props.redirectData}/>
			<VkBtn redirectData={this.props.redirectData}/>
			<ManualLogin redirectData={this.props.redirectData}/>
		</div>)
	}
}

export default LoginForm;