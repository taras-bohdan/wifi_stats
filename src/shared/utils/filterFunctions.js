import toNumber from 'lodash/toNumber';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';

/**
 * Filter users by date range
 * @param dateRange - {start: Date, end: Date}
 * @param users - array of users
 * @returns {Array.<Object>} - filtered array of users
 */
export function filterUsersByDate(dateRange, users) {
	return users.filter(user => {
		return !isUndefined(user.dateAdded) && moment(user.dateAdded).isAfter(dateRange.start)
			&& moment(user.dateAdded).isBefore(dateRange.end)
	});
}

/**
 * Filter users by date range
 * @param hospitals - {array}
 * @param users - array of users
 * @returns {Array.<Object>} - filtered array of users
 */
export function filterUsersByHospitalId(hospitals, users) {
	return users.filter(user => {
		return hospitals.some(id => id === toNumber(user.hospitalId));
	});
}