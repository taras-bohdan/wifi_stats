import Stats from '../Stats';
import {connect} from 'react-redux';
import {dateChangeStart, dateChangeEnd} from '../../redux/actions/actionCreators';
import moment from 'moment';


const mapStateToProps = state => {
	const dateRange = state.dateRange ? {
		start: moment(state.dateRange.start),
		end: moment(state.dateRange.end),
	} : {
		start: moment().startOf('month'),
		end: moment().endOf('month')
	};

	const newState = Object.assign({}, state);
	newState.dateRange = dateRange;

	return newState;
};

const mapDispatchToProps = dispatch => {
	return {
		onDateChangeStart: date => {
			console.log(date);
			console.log('dispatch start change');
			dispatch(dateChangeStart(date));
		},
		onDateChangeEnd: date => {
			console.log(date);
			console.log('dispatch end change');
			dispatch(dateChangeEnd(date));
		}
	}
};

const StatsContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Stats);

export default StatsContainer;