import actionTypes from './actionTypes'

export function getUsers() {
	return {type: actionTypes.getUsers}
}

export function fbLogin() {
	return {type: actionTypes.fbLogin}
}
export function vkLogin() {
	return {type: actionTypes.vkLogin}
}
export function manualLogin(userInfo) {
	return {type: actionTypes.manualLogin, userInfo}
}
export function loginSuccess(userInfo) {
	return {type: actionTypes.loginSuccess, userInfo}
}


