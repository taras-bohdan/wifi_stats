import actionTypes from './actionTypes'

export function getUsers() {
	return {type: actionTypes.getUsers}
}

export function manualLogin(userInfo) {
	return {type: actionTypes.manualLogin, userInfo}
}

export function loginSuccess(userInfo) {
	return {type: actionTypes.loginSuccess, userInfo}
}


