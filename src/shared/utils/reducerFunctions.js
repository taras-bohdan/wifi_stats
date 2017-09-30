import moment from 'moment';
import {filterUsersByHospitalId, filterUsersByDate} from "./filterFunctions";

export function dateChangeStart(state, action) {
	const newDateRange = Object.assign({}, state.dateRange);

	newDateRange.start = action.date;
	//TODO figure out where to convert string data to moment
	newDateRange.end = moment(newDateRange.end);

	const newState = Object.assign({}, state);
	newState.dateRange = newDateRange;
	newState.users = filterUsersByDate(newDateRange, state.originalUsers);

	return newState;
}

export function dateChangeEnd(state, action) {
	const newDateRange = Object.assign({}, state.dateRange);

	//TODO figure out where to convert string data to moment
	newDateRange.start = moment(newDateRange.start);
	newDateRange.end = action.date;

	const newState = Object.assign({}, state);
	newState.dateRange = newDateRange;
	newState.users = filterUsersByDate(newDateRange, state.originalUsers);

	return newState;
}

export function toggleHospital(state, action) {
	const newState = Object.assign({}, state);
	newState.users = filterUsersByHospitalId(action.hospitals, state.originalUsers);
	return newState;
}

export function showAllHospitals(state, action) {
	const newState = Object.assign({}, state);
	newState.users = action.showAll ? newState.originalUsers : [];
	return newState;
}