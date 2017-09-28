import ConfigPanel from './ConfigPanel';
import {connect} from 'react-redux';

const mapStateToProps = state => {
	return state.stats;
};

export default connect(mapStateToProps)(ConfigPanel);