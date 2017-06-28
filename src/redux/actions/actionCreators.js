import actionTypes from './actionTypes'

export function getUsers() {
	return {type: actionTypes.getUsers}
}

export function dateChangeStart(date) {
	return {type: actionTypes.dateChangeStart, date}
}

export function dateChangeEnd(date) {
	return {type: actionTypes.dateChangeEnd, date}
}


