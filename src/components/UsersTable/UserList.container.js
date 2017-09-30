import UserList from './UsersList';
import {connect} from 'react-redux';
import {changePage, changeRowsPerPage, sortUsers} from "../../redux/actions/actionCreators";
import isUndefined from 'lodash/isUndefined';

const mapStateToProps = state => {
	const newState = Object.assign({}, state.usersList);
	newState.order = newState.order || 'asc';
	newState.page = isUndefined(newState.page) ? 0 : newState.page;
	newState.rowsPerPage = newState.rowsPerPage || 10;
	return newState;
};

const mapDispatchToProps = dispatch => {
	return {
		onRequestSort: (property, order) => {
			dispatch(sortUsers(property, order));
		},
		onPageChange: page => {
			dispatch(changePage(page));
		},
		onRowsPerPageChange: rowsNumber => {
			dispatch(changeRowsPerPage(rowsNumber));
		}
	}
};

const UserListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);

export default UserListContainer;