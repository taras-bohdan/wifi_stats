import actionTypes from './actionTypes'

export function dateChangeStart(date) {
	return {type: actionTypes.dateChangeStart, date}
}

export function dateChangeEnd(date) {
	return {type: actionTypes.dateChangeEnd, date}
}

export function userLogin(userInfo) {
	return {type: actionTypes.userLogin, userInfo}
}

export function filterByHospital(id) {
	return {type: actionTypes.filterByHospital, id}
}