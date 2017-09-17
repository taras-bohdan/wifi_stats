import actionTypes from '../actions/actionTypes';
import moment from 'moment';
import {isUndefined, toNumber} from 'lodash';

const reducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.getUsers: {
			return state;
		}
		case actionTypes.dateChangeStart: {
			const newDateRange = Object.assign({}, state.dateRange);

			newDateRange.start = action.date;
			//TODO figure out where to convert string data to moment
			newDateRange.end = moment(newDateRange.end);

			const newState = Object.assign({}, state);
			newState.dateRange = newDateRange;
			newState.users = filterUsersByDate(newDateRange, state.originalUsers);

			return newState;
		}
		case actionTypes.dateChangeEnd: {
			const newDateRange = Object.assign({}, state.dateRange);

			//TODO figure out where to convert string data to moment
			newDateRange.start = moment(newDateRange.start);
			newDateRange.end = action.date;

			const newState = Object.assign({}, state);
			newState.dateRange = newDateRange;
			newState.users = filterUsersByDate(newDateRange, state.originalUsers);

			return newState;
		}
		case actionTypes.filterByHospital: {
			const newState = Object.assign({}, state);
			newState.users = filterUsersByHospitalId(action.id, state.originalUsers);
			return newState;
		}
		default:
			return state;
	}
};

export default reducer;

/**
 * Filter users by date range
 * @param dateRange - {start: Date, end: Date}
 * @param users - array of users
 * @returns {Array.<Object>} - filtered array of users
 */
function filterUsersByDate(dateRange, users){
	return users.filter(user => {
		return !isUndefined(user.dateAdded) && moment(user.dateAdded).isAfter(dateRange.start)
			&& moment(user.dateAdded).isBefore(dateRange.end)
	});
}

/**
 * Filter users by date range
 * @param hospitalId - {Number}
 * @param users - array of users
 * @returns {Array.<Object>} - filtered array of users
 */
function filterUsersByHospitalId(hospitalId, users){
	return users.filter(user => {
		return toNumber(user.hospitalId) === hospitalId;
	});
}