import actionTypes from '../actions/actionTypes'
// import {SERVER_HOST} from '../../../config';

export default function reducer(state = {}, action) {
	switch (action.type) {
		case actionTypes.getUsers:
			/*requestInitialData((err, data) => {
			 if (!err) {
			 return Object.assign({}, state, {
			 users: data
			 });
			 } else {
			 //return unmodified state
			 return state;
			 }
			 });*/
			return state;
		case actionTypes.manualLogin:
			//TODO get logged in user from db
			return state;
		default:
			return state;
	}
}

/*
const requestInitialData = (callback) => {
	return fetch(SERVER_HOST + '/users')
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			callback(null, response.json());
		})
		.catch((error) => {
			console.error(error);
			callback(error)
		});
};*/
