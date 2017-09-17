import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isUndefined} from 'lodash';

class ListItem extends Component {
	render() {
		let trStyle = {
			textAlign: 'center'
		};
		return <tr style={trStyle}>
			<td>{this.props.sex}</td>
			<td>{this.props.age}</td>
			<td>{!isUndefined(this.props.dateAdded) ? new Date(this.props.dateAdded).toLocaleString() : ''}</td>
			<td>{this.props.hospitalId}</td>
		</tr>
	}
}

ListItem.propTypes = {
	sex: PropTypes.string,
	age: PropTypes.any,
	hospitalId: PropTypes.any,
	dateAdded: PropTypes.any
};

export default ListItem;