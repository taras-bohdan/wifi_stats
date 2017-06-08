import React, {Component, PropTypes} from 'react';
import UserStatistics from './UserStatistics';
import Charts from './PieChart/Charts';
import LineChart from './LineChart/LineChart';
import List from './List';
import DateSelect from './DateSelect';

class Stats extends Component {
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
				<DateSelect/>
				<div className="user-list-chart">
					<LineChart data={this.state.users} dimensions={linearChartDimensions}/>
					<List users={this.state.users}/>
				</div>
				<UserStatistics users={this.state.users}/>
				<Charts data={this.state.users}/>
			</div>
		)
	}
}

Stats.propTypes = {
	users: PropTypes.array
};

export default Stats;