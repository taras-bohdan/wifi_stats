import {sendUserInfo} from '../../utils/requests';
import actionTypes from '../actions/actionTypes';
import {isUndefined} from 'lodash';

const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.userLogin: {

			let link = '/';
			if (!isUndefined(action.userInfo.redirectData)) {
				const linkLoginOnly = action.userInfo.redirectData.linkLoginOnly,
					dst = 'http://google.com.ua',
					userName = 'T-' + action.userInfo.redirectData.macEsc;
				link = linkLoginOnly + '?dst=' + dst + '&username=' + userName;
			}

			if (action.userInfo.selectedAge && action.userInfo.selectedGender) {
				sendUserInfo({
					age: action.userInfo.selectedAge,
					sex: action.userInfo.selectedGender,
					hospitalId: action.userInfo.hospitalId || 0
				}, link)
			}


			return state;
		}
		default:
			return state;
	}
};

export default loginReducer;
