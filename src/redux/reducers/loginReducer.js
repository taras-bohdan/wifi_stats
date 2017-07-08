import {sendUserInfo} from '../../utils/requests';
import actionTypes from '../actions/actionTypes';
import isUndefined from 'lodash.isundefined';

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

			/*this.setState({
				ageSelected: isEqual(this.state.selectedAge, ''),
				genderSelected: isEqual(this.state.selectedGender, '')
			});*/

			if (action.userInfo.selectedAge && action.userInfo.selectedGender) {
				sendUserInfo({
					name: 'NA',
					age: action.userInfo.selectedAge,
					sex: action.userInfo.selectedGender,
					birthday: 'NA',
					location: 'NA'
				}, link)
			}


			return state;
		}
		default:
			return state;
	}
};

export default loginReducer;
