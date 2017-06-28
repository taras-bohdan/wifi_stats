import React, {Component} from 'react';
import PropTypes from 'prop-types';
import UserStatistics from './UserStatistics';
import Charts from './PieChart/Charts';
import LineChart from './LineChart/LineChart';
import List from './List';
import DateSelect from './DateSelect';

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

	startDateSelected(date) {
		this.props.onDateChangeStart(date);
	}

	endDateSelected(date) {
		this.props.onDateChangeEnd(date);
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
	users: PropTypes.array,
	onDateChangeStart: PropTypes.func,
	onDateChangeEnd: PropTypes.func,
	dateRange: PropTypes.object
};

export default Stats;