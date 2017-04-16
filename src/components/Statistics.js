import React, {Component} from 'react';
import List from './List';
import UserStatistics from './UserStatistics';
import fetch from 'isomorphic-fetch';
import SERVER_HOST from 'config';

class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users || []
		};
	}

	componentDidMount() {
		Statistics.requestInitialData().then(users => {
			this.setState({users});
		});
	}

	render() {
		return (
			<div>
				<List users={this.state.users}/>
				<UserStatistics users={this.state.users}/>
			</div>
		)
	}
}

Statistics.requestInitialData = () => {
	return fetch(SERVER_HOST + '/users')
		.then((response) => response.json())
		.catch((error) => {
			console.error(error);
		});
};

export default Statistics;