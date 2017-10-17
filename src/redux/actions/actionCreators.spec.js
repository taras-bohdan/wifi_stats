import * as actions from './actionCreators';
import types from './actionTypes';

describe('actions', () => {
	it('should create an action to change start date', () => {
		const date = new Date;
		const expectedAction = {
			type: types.dateChangeStart,
			date
		};
		expect(actions.dateChangeStart(date)).toEqual(expectedAction)
	});

	it('should create an action to change end date', () => {
		const date = new Date;
		const expectedAction = {
			type: types.dateChangeEnd,
			date
		};
		expect(actions.dateChangeEnd(date)).toEqual(expectedAction)
	});

	it('should create an action to toggle hospital', () => {
		const hospitals = [
			{id: 1, toggled: false},
			{id: 2, toggled: true}
		];
		const expectedAction = {
			type: types.toggleHospital,
			hospitals
		};
		expect(actions.toggleHospital(hospitals)).toEqual(expectedAction)
	});

	it('should create an action to toggle show all hospitals', () => {
		const showAll = true;
		const expectedAction = {
			type: types.showAllHospitals,
			showAll
		};
		expect(actions.showAllHospitals(showAll)).toEqual(expectedAction)
	});

	it('should create an action to toggle menu', () => {
		const expectedAction = {
			type: types.toggleMenu,
		};
		expect(actions.toggleMenu()).toEqual(expectedAction)
	});

	it('should create an action to sort users', () => {
		const property = 'hospitalId';
		const order = 'ASC';
		const expectedAction = {
			type: types.sortUsers,
			property,
			order
		};
		expect(actions.sortUsers(property, order)).toEqual(expectedAction)
	});

	it('should create an action to change page', () => {
		const page = 5;
		const expectedAction = {
			type: types.changePage,
			page
		};
		expect(actions.changePage(page)).toEqual(expectedAction)
	});

	it('should create an action to change rows per page', () => {
		const rowNumber = 5;
		const expectedAction = {
			type: types.changeRowsPerPage,
			rowNumber
		};
		expect(actions.changeRowsPerPage(rowNumber)).toEqual(expectedAction)
	});

	it('should create an action to show users info dialog', () => {
		const userInfo = {hospitalId: 2};
		const open = true;
		const expectedAction = {
			type: types.showUserInfoDialog,
			userInfo,
			open
		};
		expect(actions.showUserInfoDialog(userInfo, open)).toEqual(expectedAction)
	});

	it('should create an action to close users info dialog', () => {
		const expectedAction = {
			type: types.closeUserInfoDialog,
		};
		expect(actions.closeUserInfoDialog()).toEqual(expectedAction)
	});
});