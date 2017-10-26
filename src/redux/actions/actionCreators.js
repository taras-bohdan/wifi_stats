import actionTypes from './actionTypes';

export function dateChangeStart(date) {
  return { type: actionTypes.dateChangeStart, date };
}

export function dateChangeEnd(date) {
  return { type: actionTypes.dateChangeEnd, date };
}

export function toggleHospital(hospitals) {
  return { type: actionTypes.toggleHospital, hospitals };
}

export function showAllHospitals(showAll) {
  return { type: actionTypes.showAllHospitals, showAll };
}

export function toggleMenu() {
  return { type: actionTypes.toggleMenu };
}

export function sortUsers(property, order) {
  return { type: actionTypes.sortUsers, property, order };
}

export function changePage(page) {
  return { type: actionTypes.changePage, page };
}

export function changeRowsPerPage(rowNumber) {
  return { type: actionTypes.changeRowsPerPage, rowNumber };
}

export function showUserInfoDialog(userInfo, open) {
  return { type: actionTypes.showUserInfoDialog, userInfo, open };
}

export function closeUserInfoDialog() {
  return { type: actionTypes.closeUserInfoDialog };
}
