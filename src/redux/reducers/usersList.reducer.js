import orderBy from 'lodash/orderBy';
import actionTypes from '../actions/actionTypes';
import { showAllHospitals, toggleHospital, dateChangeEnd, dateChangeStart } from '../../shared/utils/reducerFunctions';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.getUsers: {
      return state;
    }
    case actionTypes.dateChangeStart: {
      return dateChangeStart(state, action);
    }
    case actionTypes.dateChangeEnd: {
      return dateChangeEnd(state, action);
    }
    case actionTypes.sortUsers: {
      const newState = Object.assign({}, state);
      newState.order = action.order;
      newState.users = orderBy(newState.users, action.property, action.order);
      newState.orderBy = action.property;
      return newState;
    }
    case actionTypes.changePage: {
      const newState = Object.assign({}, state);
      newState.page = action.page;
      return newState;
    }
    case actionTypes.changeRowsPerPage: {
      const newState = Object.assign({}, state);
      newState.rowsPerPage = action.rowNumber;
      return newState;
    }
    case actionTypes.toggleHospital: {
      return toggleHospital(state, action);
    }
    case actionTypes.showAllHospitals: {
      return showAllHospitals(state, action);
    }
    case actionTypes.showUserInfoDialog: {
      const newState = Object.assign({}, state);
      newState.userInfoDialogData = {
        open: action.open,
        data: action.userInfo,
      };
      return newState;
    }
    case actionTypes.closeUserInfoDialog: {
      const newState = Object.assign({}, state);
      newState.userInfoDialogData.open = false;
      return newState;
    }
    default:
      return state;
  }
};
