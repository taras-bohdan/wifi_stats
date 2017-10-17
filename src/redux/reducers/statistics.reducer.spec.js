import actionTypes from '../actions/actionTypes';
import reducer from './statistics.reducer';
import moment from 'moment';

const state = {
	dateRange: {
		start: moment(),
		end: moment()
	}
};

describe('statistics reducer', () => {
	it('should test the initial state', () => {
		expect(reducer(undefined, {})).toEqual({})
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
	})
});