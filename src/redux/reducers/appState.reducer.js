import actionTypes from '../actions/actionTypes';

export default (state = {}, action) => {
	switch (action.type) {
		case actionTypes.toggleMenu: {
			const newState = Object.assign({}, state);
			newState.menuToggled = !newState.menuToggled;
			return newState;
		}
		case actionTypes.toggleHospital: {
			const newState = Object.assign({}, state);
			newState.hospitals = newState.hospitals.map(hospital => {
				hospital.checked = action.hospitals.some(id => id === hospital.id)
				return hospital;
			});
			newState.showAll = newState.hospitals.every(h => h.checked);
			return newState;
		}
		case actionTypes.showAllHospitals: {
			const newState = Object.assign({}, state);
			newState.hospitals = newState.hospitals.map(hospital => {
				hospital.checked = action.showAll;
				return hospital;
			});
			newState.showAll = action.showAll;
			return newState;
		}
		default:
			return state;
	}
};