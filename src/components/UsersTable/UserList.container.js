import UserList from './UsersList';
import {connect} from 'react-redux';
import {sortUsers} from "../../redux/actions/actionCreators";

const mapStateToProps = state => {
	const newState = Object.assign({}, state.stats);
	newState.order = newState.order || 'asc';
	return newState;
};

const mapDispatchToProps = dispatch => {
	return {
		onRequestSort: (property, order) => {
			dispatch(sortUsers(property, order));
		}
	}
};

const UserListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);

export default UserListContainer;