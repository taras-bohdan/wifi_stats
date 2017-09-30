import actionTypes from '../actions/actionTypes';
import orderBy from 'lodash/orderBy';
import {filterUsersByHospitalId} from "../../shared/utils/filterFunctions";

export default (state = {}, action) => {
	switch (action.type) {
		case actionTypes.getUsers: {
			return state;
		}
		case actionTypes.sortUsers: {
			const newState = Object.assign({}, state);
			newState.order = action.order;
			newState.users = orderBy(newState.users, action.property, action.order);
			newState.orderBy = action.property;
			return newState;
		}
		case actionTypes.changePage: {
			const newState = Object.assign({}, state);
			newState.page = action.page;
			return newState;
		}
		case actionTypes.changeRowsPerPage: {
			const newState = Object.assign({}, state);
			newState.rowsPerPage = action.rowNumber;
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
}