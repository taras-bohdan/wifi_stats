import { connect } from 'react-redux';
import NavBar from './NavBar';
import { toggleMenu } from '../../redux/actions/actionCreators';

const mapStateToProps = state => state.appState;

const mapDispatchToProps = dispatch => ({
  onMenuToggle: () => {
    dispatch(toggleMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
