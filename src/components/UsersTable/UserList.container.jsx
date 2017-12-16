import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import UserList from './UserList';
import { changePage, changeRowsPerPage, sortUsers, showUserInfoDialog } from '../../redux/actions/actionCreators';

const mapStateToProps = (state) => {
  const newState = Object.assign({}, state.usersList);
  newState.order = newState.order || 'asc';
  newState.page = isUndefined(newState.page) || newState.page < 0 ? 0 : newState.page;
  newState.rowsPerPage = newState.rowsPerPage || 10;

  // TODO check if instance of date or moment
  newState.dateRange.start = new Date(newState.dateRange.start);
  newState.dateRange.end = new Date(newState.dateRange.end);

  newState.users = newState.users.filter((user) => {
    const dateAdded = new Date(user.dateAdded);
    return dateAdded > newState.dateRange.start && dateAdded < newState.dateRange.end;
  });
  return newState;
};

const mapDispatchToProps = dispatch => ({
  onRequestSort: (property, order) => {
    dispatch(sortUsers(property, order));
  },
  onPageChange: (page) => {
    dispatch(changePage(page));
  },
  onRowsPerPageChange: (rowsNumber) => {
    dispatch(changeRowsPerPage(rowsNumber));
  },
  onRowClick: (userInfo) => {
    dispatch(showUserInfoDialog(userInfo, true));
  },
});

const UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default UserListContainer;
