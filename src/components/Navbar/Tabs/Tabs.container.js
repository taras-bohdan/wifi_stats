import {connect} from 'react-redux';
import Tabs from './Tabs';
import {filterByHospital} from '../../../redux/actions/actionCreators';

const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
		onFilterByHospital: hospitalId => {
			dispatch(filterByHospital(hospitalId));
		}
	}
};

const TabsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Tabs);

export default TabsContainer;