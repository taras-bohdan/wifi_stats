import NavBar from './NavBar';
import {connect} from 'react-redux';
import {toggleMenu} from "../../redux/actions/actionCreators";

const mapStateToProps = state => {
	return state.appState;
};

const mapDispatchToProps = dispatch => {
	return {
		onMenuToggle: () => {
			dispatch(toggleMenu());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);