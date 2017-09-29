import NavBar from './NavBar';
import {connect} from 'react-redux';
import {toggleMenu} from "../../redux/actions/actionCreators";

const mapStateToProps = state => {
	return state.stats;
};

const mapDispatchToProps = dispatch => {
	return {
		onMenuToggle: () => {
			dispatch(toggleMenu());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);