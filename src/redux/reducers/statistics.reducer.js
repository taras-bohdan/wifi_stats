import actionTypes from '../actions/actionTypes';
import {dateChangeStart, dateChangeEnd, toggleHospital, showAllHospitals} from "../../shared/utils/reducerFunctions";

const reducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.getUsers: {
			return state;
		}
		case actionTypes.dateChangeStart: {
			return dateChangeStart(state, action);
		}
		case actionTypes.dateChangeEnd: {
			return dateChangeEnd(state, action);
		}
		case actionTypes.toggleHospital: {
			return toggleHospital(state, action);
		}
		case actionTypes.showAllHospitals: {
			return showAllHospitals(state, action);
		}
		default:
			return state;
	}
};

export default reducer;