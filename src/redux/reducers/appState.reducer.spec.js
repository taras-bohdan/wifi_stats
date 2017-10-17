import reducer from './appState.reducer';
import actionTypes from '../actions/actionTypes';

const TOGGLED_HOSPITALS_ALL = [
	{id: 1, checked: true},
	{id: 2, checked: true},
	{id: 3, checked: true}
];

const TOGGLED_HOSPITALS_NONE = [
	{id: 1, checked: false},
	{id: 2, checked: false},
	{id: 3, checked: false}
];

describe('application state reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({})
	});

	it('should handle toggle menu', () => {
		expect(reducer({
			menuToggled: false
		}, {
			type: actionTypes.toggleMenu
		})).toEqual({
			menuToggled: true
		});
	});

	it('should toggle hospital on', () => {
		expect(reducer({
			hospitals: TOGGLED_HOSPITALS_NONE
		}, {
			type: actionTypes.toggleHospital,
			hospitals: TOGGLED_HOSPITALS_ALL
		})).toEqual({
			hospitals: TOGGLED_HOSPITALS_ALL,
			showAll: true
		});
	});

	it('should toggle hospital off', () => {
		expect(reducer({
			hospitals: TOGGLED_HOSPITALS_ALL
		}, {
			type: actionTypes.toggleHospital,
			hospitals: [{
				id: 2,
				checked: true
			}]
		})).toEqual({
			hospitals: [{
				id: 1,
				checked: false
			}, {
				id: 2,
				checked: true
			}, {
				id: 3,
				checked: false
			}],
			showAll: false
		});
	});

	it('should show all hospitals', () => {
		expect(reducer({
			hospitals: TOGGLED_HOSPITALS_NONE,
			showAll: false
		}, {
			type: actionTypes.showAllHospitals,
			showAll: true
		})).toEqual({
			hospitals: TOGGLED_HOSPITALS_ALL,
			showAll: true
		});
	});

	it('should show none hospitals', () => {
		expect(reducer({
			hospitals: TOGGLED_HOSPITALS_ALL,
			showAll: true
		}, {
			type: actionTypes.showAllHospitals,
			showAll: false
		})).toEqual({
			hospitals: TOGGLED_HOSPITALS_NONE,
			showAll: false
		})
	})
});