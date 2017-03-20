import React, {Component} from 'react';

class ListItem extends Component {
	render() {
		return <tr>
			<td>{this.props.name}</td>
			<td>{this.props.sex}</td>
			<td>{this.props.birthday}</td>
			<td>{this.props.location}</td>
			<td>{this.props.age}</td>
		</tr>
	}
}

export default ListItem;