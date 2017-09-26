import actionTypes from './actionTypes'

export function dateChangeStart(date) {
	return {type: actionTypes.dateChangeStart, date}
}

export function dateChangeEnd(date) {
	return {type: actionTypes.dateChangeEnd, date}
}

export function filterByHospital(id) {
	return {type: actionTypes.filterByHospital, id}
}