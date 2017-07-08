import LoginForm from '../Login/LoginForm';
import {connect} from 'react-redux';
import {userLogin} from '../../redux/actions/actionCreators';

const mapStateToProps = state => {
	return state.login;
};

const mapDispatchToProps = dispatch => {
	return {
		onUserLogin: state => {
			dispatch(userLogin(state));
		}
	}
};

const LoginFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;