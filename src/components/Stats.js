import React, {Component, PropTypes} from 'react';
import UserStatistics from './UserStatistics';
import Charts from './PieChart/Charts';
import LineChart from './LineChart/LineChart';
import List from './List';
import DateSelect from './DateSelect';
import moment from 'moment';

class Stats extends Component {
	constructor(props) {
		super(props);
		let users = [];
		const dateRange = {
			start: moment().startOf('month'),
			end: moment().endOf('month')
		};
		if (props.users) {
			users = props.users.filter(user => {
				return new Date(user.dateAdded) > dateRange.start && new Date(user.dateAdded) < dateRange.end
			})
		}

		this.state = {
			users: users || [],
			dateRange: dateRange
		};
	}

	// filterUsersByDate(user) {
	// 	return new Date(user.dateAdded) > dateRange.start && new Date(user.dateAdded) < dateRange.end;
	// }

	startDateSelected(date) {
		console.log('change end');
		const newDateRange = Object.assign({}, this.state.dateRange);
		newDateRange.start = date;
		this.setState({dateRange: newDateRange});
	}

	endDateSelected(date) {
		console.log('change end');
		const newDateRange = Object.assign({}, this.state.dateRange);
		newDateRange.end = date;
		this.setState({dateRange: newDateRange});
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
				<DateSelect dates={this.state.dateRange} startDateChange={this.startDateSelected.bind(this)}
							endDateChange={this.endDateSelected.bind(this)}/>
				<div className="user-list-chart">
					<LineChart dates={this.state.dateRange} data={this.state.users} dimensions={linearChartDimensions}/>
					<List dates={this.state.dateRange} users={this.state.users}/>
				</div>
				<UserStatistics dates={this.state.dateRange} users={this.state.users}/>
				<Charts dates={this.state.dateRange} data={this.state.users}/>
			</div>
		)
	}
}

Stats.propTypes = {
	users: PropTypes.array
};

export default Stats;