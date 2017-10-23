import { connect } from 'react-redux';
import ConfigPanel from './ConfigPanel';
import { toggleMenu } from '../../redux/actions/actionCreators';

const mapStateToProps = state => state.appState;

const mapDispatchToProps = dispatch => ({
  onMenuToggle: () => {
    dispatch(toggleMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfigPanel);
