import React, {Component} from 'react';
import ListItem from './ListItem';

class List extends Component {
	componentWillReceiveProps(nextProps) {
		this.setState({username: nextProps.username});
	}

	render() {
		let users = this.props.users.map((user) => {
			return <ListItem key={user._id}
							 name={user.name}
							 age={user.age}
							 sex={user.sex}
							 birthday={user.birthday}
							 location={user.location}
							 dateAdded={user.dateAdded}
			/>
		});
		return (
			<div className="table-container">
				<table className="list">
					<thead>
					<tr>
						<th>Name</th>
						<th>Gender</th>
						<th>Birthday</th>
						<th>Location</th>
						<th>Age</th>
						<th>Date added</th>
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

export default List;
