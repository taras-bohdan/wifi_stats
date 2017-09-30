import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case actionTypes.toggleMenu: {
			const newState = Object.assign({}, state);
			newState.menuToggled = !newState.menuToggled;
			return newState;
		}
		default:
			return state;
	}
};