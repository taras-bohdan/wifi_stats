import Stats from '../Stats';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
	return state;
};

const StatsContainer = connect(
	mapStateToProps
)(Stats);

export default StatsContainer;