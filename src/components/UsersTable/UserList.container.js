import UserList from './UsersList';
import {connect} from 'react-redux';

const mapStateToProps = state => {
	return Object.assign({}, state.stats);
};

const mapDispatchToProps = dispatch => {
	return {}
};

const UserListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserList);

export default UserListContainer;