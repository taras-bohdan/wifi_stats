import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import AxisX from './xAxis';
import AxisY from './yAxis';
import Path from './Path';
import forEach from 'lodash.foreach';
import isEqual from 'lodash.isequal';
import clone from 'lodash.clone';
import isUndefined from 'lodash.isundefined';

class LineChart extends Component {
	render() {
		var data = transformData(this.props.data);
		return (
			<svg className="line-chart" width={this.props.dimensions.width} height={this.props.dimensions.height}>
				<g>
					<Path data={data} dimensions={this.props.dimensions}/>
					<AxisX data={data} dimensions={this.props.dimensions}/>
					<AxisY data={data} dimensions={this.props.dimensions}/>
				</g>
			</svg>
		)
	}
}

function transformData(data) {
	const usersData = clone(data),
		currentDate = new Date(),
		currentMonthDays = d3.timeDays(d3.timeMonth(currentDate), d3.timeMonth.ceil(currentDate));
	let monthStats = [];
	//for each day of created month
	forEach(currentMonthDays, (day) => {
		let dayStats = {
			date: day,
			usersCount: 0
		};
		//go through all data
		forEach(usersData, (user) => {
			//if user was logged at current day, increment counter
			if (!isUndefined(user.dateAdded) && isEqual(new Date(user.dateAdded).setHours(0, 0, 0, 0), day.getTime())) {
				dayStats.usersCount++;
			}
		});
		monthStats.push(dayStats);
	});
	return monthStats;
}

LineChart.PropTypes = {
	data: PropTypes.object,
	dimensions: PropTypes.object
};

export default LineChart;