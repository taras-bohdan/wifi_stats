import LoginForm from '../Login/LoginForm'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
	return state;
};

const LoginFormContainer = connect(
	mapStateToProps
)(LoginForm);

export default LoginFormContainer;