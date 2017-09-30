import actionTypes from '../actions/actionTypes';
import orderBy from 'lodash/orderBy';

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
		default:
			return state;
	}
}