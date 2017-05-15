import React, {Component} from 'react';
import UserStatistics from './UserStatistics';
import fetch from 'isomorphic-fetch';
import {SERVER_HOST} from '../../config';
import Charts from './PieChart/Charts';
import LineChart from './LineChart/LineChart';
import ListContainer from './containers/ListContainer'

class Statistics extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users || []
		};
	}

	render() {
		const divStyle = {
			display: 'flex',
			justifyContent: 'space-between',
		}, linearChartDimensions = {
			width: 500,
			height: 300,
			padding: 30
		};
		return (
			<div className="statistic_container" style={divStyle}>
				<div className="user-list-chart">
					<LineChart data={this.state.users}
							   dimensions={linearChartDimensions}/>
					<ListContainer users={this.state.users}/>
				</div>
				<UserStatistics users={this.state.users}/>
				<Charts data={this.state.users}/>
			</div>
		)
	}
}

Statistics.requestInitialData = () => {
	return fetch(SERVER_HOST + '/users')
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}
			return response.json();
		})
		.catch((error) => {
			console.error(error);
		});
};

export default Statistics;