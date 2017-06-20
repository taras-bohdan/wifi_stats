import React, {Component, PropTypes} from 'react';
import ListItem from './ListItem';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({users: nextProps.users});
	}

	render() {
		let users = this.state.users.map((user) => {
			return <ListItem key={user._id} name={user.name} age={user.age} sex={user.sex} birthday={user.birthday}
							 location={user.location} dateAdded={user.dateAdded}
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

List.propTypes = {
	users: PropTypes.array.isRequired,
	username: PropTypes.string,
	dates: PropTypes.object
};

export default List;
