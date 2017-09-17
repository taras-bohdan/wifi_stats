import {connect} from 'react-redux';
import HospitalSelector from './HospitalSelector';
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

const HospitalSelectorContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HospitalSelector);

export default HospitalSelectorContainer;