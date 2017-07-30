import {connect} from 'react-redux';
import DateSelect from './DateSelect';
import {dateChangeStart, dateChangeEnd} from '../../../redux/actions/actionCreators';
import moment from 'moment';

const mapStateToProps = state => {
	const dateRange = state.stats.dateRange ? {
		start: moment(state.stats.dateRange.start),
		end: moment(state.stats.dateRange.end),
	} : {
		start: moment().startOf('month'),
		end: moment().endOf('month')
	};

	const newState = Object.assign({}, state.stats);
	newState.dateRange = dateRange;

	return newState;
};

const mapDispatchToProps = dispatch => {
	return {
		onDateChangeStart: date => {
			dispatch(dateChangeStart(date));
		},
		onDateChangeEnd: date => {
			dispatch(dateChangeEnd(date));
		}
	}
};

const DateSelectContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(DateSelect);

export default DateSelectContainer;