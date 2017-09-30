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

export function toggleMenu() {
	return {type: actionTypes.toggleMenu}
}

export function sortUsers(property, order) {
	return {type: actionTypes.sortUsers, property, order}
}

export function changePage(page) {
	return {type: actionTypes.changePage, page}
}

export function changeRowsPerPage(rowNumber) {
	return {type: actionTypes.changeRowsPerPage, rowNumber}
}