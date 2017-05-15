import List from '../List'
import {connect} from 'react-redux'

const mapStateToProps = (state) => {
	return state;
};

const ListContainer = connect(
	mapStateToProps
)(List);

export default ListContainer;