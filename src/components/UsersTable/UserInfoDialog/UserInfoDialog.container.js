import UserInfoDialog from './UserInfoDialog';
import {connect} from 'react-redux';
import {closeUserInfoDialog} from "../../../redux/actions/actionCreators";

const mapStateToProps = state => {
	return Object.assign({}, state.usersList.userInfoDialogData);
};

const mapDispatchToProps = dispatch => {
	return {
		onUserInfoDialogClose: () => {
			dispatch(closeUserInfoDialog());
		}
	}
};

const UserInfoDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(UserInfoDialog);

export default UserInfoDialogContainer;