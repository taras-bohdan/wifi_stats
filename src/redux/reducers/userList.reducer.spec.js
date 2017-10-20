import actionTypes from '../actions/actionTypes';
import reducer from './usersList.reducer';
import moment from 'moment';

const state = {
	users: [
		{id: 2, hospitalId: 2},
		{id: 5, hospitalId: 1},
		{id: 3, hospitalId: 4},
		{id: 4, hospitalId: 3},
		{id: 1, hospitalId: 5}
	],
	dateRange: {
		start: moment(),
		end: moment()
	}
};

describe('user list reducer', () => {
	it('should test the initial state', () => {
		expect(reducer(undefined, {})).toEqual({});
	});

	it('should test date change start', () => {
		const newDate = moment();
		newDate.dayOfYear(newDate.dayOfYear() - 1);

		expect(reducer(state, {
			type: actionTypes.dateChangeStart,
			date: newDate
		})).toHaveProperty('dateRange.start', newDate);
	});

	it('should test date change end', () => {
		const newDate = moment();
		newDate.dayOfYear(newDate.dayOfYear() + 1);

		expect(reducer(state, {
			type: actionTypes.dateChangeEnd,
			date: newDate
		})).toHaveProperty('dateRange.end', newDate);
	});

	it('should test sorting ASC', () => {
		expect(reducer(state, {
			type: actionTypes.sortUsers,
			order: 'asc',
			property: 'hospitalId'
		})).toHaveProperty('users', [
			{id: 5, hospitalId: 1},
			{id: 2, hospitalId: 2},
			{id: 4, hospitalId: 3},
			{id: 3, hospitalId: 4},
			{id: 1, hospitalId: 5}
		])
	});

	it('should test sorting DESC', () => {
		expect(reducer(state, {
			type: actionTypes.sortUsers,
			order: 'desc',
			property: 'hospitalId'
		})).toHaveProperty('users', [
			{id: 1, hospitalId: 5},
			{id: 3, hospitalId: 4},
			{id: 4, hospitalId: 3},
			{id: 2, hospitalId: 2},
			{id: 5, hospitalId: 1}
		])
	});

	it('should test page change', () => {
		expect(reducer({
			page: 1
		}, {
			type: actionTypes.changePage,
			page: 5
		})).toHaveProperty('page', 5)
	});

	it('should test change rows per page', () => {
		expect(reducer({
			rowsPerPage: 1
		}, {
			type: actionTypes.changeRowsPerPage,
			rowNumber: 50
		})).toHaveProperty('rowsPerPage', 50)
	});

	it('should test toggle hospital', () => {
		expect(reducer({
			originalUsers: [
				{id: 1, hospitalId: 1},
				{id: 2, hospitalId: 2},
				{id: 3, hospitalId: 3},
				{id: 4, hospitalId: 4},
				{id: 5, hospitalId: 2},
			]
		}, {
			type: actionTypes.toggleHospital,
			hospitals: [{hospitalId: 2}]
		})).toHaveProperty('users', [
			{id: 2, hospitalId: 2},
			{id: 5, hospitalId: 2}
		])
	});

	it('should test show all hospitals', () => {
		expect(reducer({
			originalUsers: [
				{id: 1, hospitalId: 1},
				{id: 2, hospitalId: 2},
				{id: 3, hospitalId: 3},
				{id: 4, hospitalId: 4},
				{id: 5, hospitalId: 2},
			]
		}, {
			type: actionTypes.showAllHospitals,
			showAll: true
		})).toHaveProperty('users', [
			{id: 1, hospitalId: 1},
			{id: 2, hospitalId: 2},
			{id: 3, hospitalId: 3},
			{id: 4, hospitalId: 4},
			{id: 5, hospitalId: 2},
		]);
	});

	it('should test hide all hospitals', () => {
		expect(reducer({
			originalUsers: [
				{id: 1, hospitalId: 1},
				{id: 2, hospitalId: 2},
				{id: 3, hospitalId: 3},
				{id: 4, hospitalId: 4},
				{id: 5, hospitalId: 2},
			]
		}, {
			type: actionTypes.showAllHospitals,
			showAll: false
		})).toHaveProperty('users', []);
	});

	it('should test show user info dialog', () => {
		expect(reducer({}, {
			type: actionTypes.showUserInfoDialog,
			open: true,
			userInfo: {
				name: 'test_name',
				hospitalId: 1
			}
		})).toHaveProperty('userInfoDialogData', {
			open: true,
			data: {
				name: 'test_name',
				hospitalId: 1
			}
		})
	});

	it('should test close user info dialog', () => {
		expect(reducer({
			userInfoDialogData: {
				open: true
			}
		}, {
			type: actionTypes.closeUserInfoDialog
		})).toHaveProperty('userInfoDialogData', {
			open: false
		})
	})
});