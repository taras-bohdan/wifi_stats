import React, {Component} from 'react';
import List from './List';
import UserStatistics from './UserStatistics';
import fetch from 'isomorphic-fetch';
import {SERVER_HOST} from '../../config';
import PieChart from './PieChart/PieChart';

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
		let dataArr = [
				{
					label: 'label1',
					value: 45
				}, {
					label: 'label2',
					value: 55
				}
			],
			innRadius = 50,
			outRadius = 100,
			x = 100,
			y = 100;
		const divStyle = {
			display: 'flex',
			justifyContent: 'space-between',
		};
		return (
			<div style={divStyle}>
				<List users={this.state.users}/>
				<UserStatistics users={this.state.users}/>
				<PieChart data={dataArr}
						  innerRadius={innRadius}
						  outerRadius={outRadius}
						  x={x}
						  y={y}/>
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