import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({users: nextProps.users});
	}

	render() {
		let users = this.state.users.map((user) => {
			return <ListItem key={user._id} age={user.age} sex={user.sex}
							 hospitalId={user.hospitalId} dateAdded={user.dateAdded}
			/>
		});
		return (
			<div className="table-container">
				<table className="list">
					<thead>
					<tr>
						<th>Gender</th>
						<th>Age</th>
						<th>Date added</th>
						<th>Hospital</th>
					</tr>
					</thead>
					<tbody>
					{users}
					</tbody>
				</table>
			</div>
		)
	}
}

List.propTypes = {
	users: PropTypes.array.isRequired,
	username: PropTypes.string,
	dates: PropTypes.object
};

export default List;
