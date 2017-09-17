import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {timeDays} from "d3";
import AxisX from './xAxis';
import AxisY from './yAxis';
import Path from './Path';
import {forEach, isEqual, clone, isUndefined} from 'lodash';
import tip from 'd3-tip';
import {select} from 'd3';

class LineChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dates: props.dates
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			dates: nextProps.dates
		});
	}

	componentDidMount(){
		const svg = select(this.node);

		/* Initialize tooltip */
		const tooltip = tip().attr('class', 'd3-tip').html((d) => {
			return `<div>Date: ${d.date.toLocaleDateString()}</div>
					<div>Users: ${d.usersCount}</div>`;
		});

		/* Invoke the tip in the context of your visualization */
		svg.call(tooltip);

		svg.selectAll('circle')
			.on('mouseover', (d) => {
				tooltip.show(d);
			})
			.on('mouseout', () => {
				tooltip.hide();
			})
	}

	transformData(data) {
		const usersData = clone(data),
			currentMonthDays = timeDays(this.state.dates.start, this.state.dates.end);
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

	render() {
		const data = this.transformData(this.props.data);
		return (
			<svg ref={node => this.node = node} className="line-chart" width={this.props.dimensions.width} height={this.props.dimensions.height}>
				<g>
					<Path data={data} dimensions={this.props.dimensions}/>
					<AxisX data={data} dimensions={this.props.dimensions}/>
					<AxisY data={data} dimensions={this.props.dimensions}/>
				</g>
			</svg>
		)
	}
}


LineChart.propTypes = {
	data: PropTypes.array.isRequired,
	dates: PropTypes.object.isRequired,
	dimensions: PropTypes.object.isRequired
};

export default LineChart;