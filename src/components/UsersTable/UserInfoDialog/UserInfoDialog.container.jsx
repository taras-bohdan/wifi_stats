import { connect } from 'react-redux';
import UserInfoDialog from './UserInfoDialog';
import { closeUserInfoDialog } from '../../../redux/actions/actionCreators';

const mapStateToProps = state => Object.assign({}, state.usersList.userInfoDialogData);

const mapDispatchToProps = dispatch => ({
  onUserInfoDialogClose: () => {
    dispatch(closeUserInfoDialog());
  },
});

const UserInfoDialogContainer = connect(mapStateToProps, mapDispatchToProps)(UserInfoDialog);

export default UserInfoDialogContainer;
