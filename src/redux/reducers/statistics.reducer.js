import actionTypes from '../actions/actionTypes';
import moment from 'moment';
import {filterUsersByDate, filterUsersByHospitalId} from "../../shared/utils/filterFunctions";

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
		case actionTypes.toggleHospital: {
			const newState = Object.assign({}, state);
			newState.users = filterUsersByHospitalId(action.hospitals, state.originalUsers);
			return newState;
		}
		case actionTypes.showAllHospitals: {
			const newState = Object.assign({}, state);
			newState.users = action.showAll ? newState.originalUsers : [];
			return newState;
		}
		default:
			return state;
	}
};

export default reducer;