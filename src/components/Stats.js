import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserStatistics from './UserStatistics';
import Charts from './Charts/Charts';
import LineChart from './Charts/LineChart/LineChart';
import List from './UsersTable/List';
import Navbar from './ConfigPanel/ConfigPanel';

class Stats extends Component {
	constructor(props) {
		super(props);
		let users = [];

		if (props.users) {
			users = props.users.filter(user => {
				return new Date(user.dateAdded) > props.dateRange.start && new Date(user.dateAdded) < props.dateRange.end
			})
		}

		this.state = {
			originalUsers: users || [],
			users: users || [],
			dateRange: props.dateRange
		};
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			dateRange: nextProps.dateRange,
			users: nextProps.users
		});
	}



	render() {
		const linearChartDimensions = {
			width: 500,
			height: 300,
			padding: 30
		};
		return (
			<div className="statistic_container">
				<Navbar/>
				<div className="user-list-chart">
					<LineChart dates={this.state.dateRange} data={this.state.users} dimensions={linearChartDimensions}/>
					<Charts dates={this.state.dateRange} data={this.state.users}/>
					<UserStatistics dates={this.state.dateRange} users={this.state.users}/>
				</div>
				<List dates={this.state.dateRange} users={this.state.users}/>
			</div>
		)
	}
}

Stats.propTypes = {
	users: PropTypes.array,
	onDateChangeStart: PropTypes.func,
	onDateChangeEnd: PropTypes.func,
	dateRange: PropTypes.object
};

export default Stats;