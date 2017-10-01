import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PieChart from './PieChart/PieChart';

class Charts extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let innRadius = 50,
			outRadius = 100,
			x = 100,
			y = 100;
		return (
			<div>
				<PieChart data={this.props.statistics.ageStats} innerRadius={innRadius} outerRadius={outRadius} x={x} y={y}/>
				<PieChart data={this.props.statistics.genderStats} innerRadius={innRadius} outerRadius={outRadius} x={x} y={y}/>
			</div>
		)
	}
}

Charts.propTypes = {
	statistics: PropTypes.object,
};

export default Charts;