import React, {Component, PropTypes} from 'react';
import isUndefined from 'lodash.isundefined';

class ListItem extends Component {
	render() {
		let trStyle = {
			textAlign: 'center'
		};
		return <tr style={trStyle}>
			<td>{this.props.name}</td>
			<td>{this.props.sex}</td>
			<td>{this.props.birthday}</td>
			<td>{this.props.location}</td>
			<td>{this.props.age}</td>
			<td>{!isUndefined(this.props.dateAdded) ? new Date(this.props.dateAdded).toLocaleString() : ''}</td>
		</tr>
	}
}

ListItem.propTypes = {
	name: PropTypes.string,
	sex: PropTypes.string,
	birthday: PropTypes.string,
	location: PropTypes.string,
	age: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	dateAdded: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.date
	])
};

export default ListItem;