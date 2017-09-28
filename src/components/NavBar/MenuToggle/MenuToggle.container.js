import MenuToggle from './MenuToggle';
import {connect} from 'react-redux';
import {toggleMenu} from "../../../redux/actions/actionCreators";

const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
		onMenuToggle: () => {
			dispatch(toggleMenu());
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuToggle);