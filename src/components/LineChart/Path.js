import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";
import Circles from './Circles';

class Path extends Component {
	constructor(props) {
		super(props);

		this.updateD3(props);

	}

	componentWillReceiveProps(newProps) {
		this.updateD3(newProps);
	}

	updateD3(newProps) {
		// Set the ranges
		let xScale = d3.scaleTime().range([this.props.dimensions.padding, newProps.dimensions.width - this.props.dimensions.padding * 2]),
			yScale = d3.scaleLinear().range([newProps.dimensions.height - this.props.dimensions.padding, this.props.dimensions.padding]);
		// Scale the range of the data
		xScale.domain(d3.extent(newProps.data, function (d) {
			return d.date;
		}));
		yScale.domain([0, d3.max(newProps.data, function (d) {
			return d.usersCount;
		})]);

		this.valueLine = d3.line()
			.x(function (d) {
				return xScale(new Date(d.date));
			})
			.y(function (d) {
				return yScale(d.usersCount);
			});
		this.scaleX = xScale;
		this.scaleY = yScale;
	}


	render() {
		return (
			<g>
				<path className="line" d={this.valueLine(this.props.data)}/>
				<Circles xScale={this.scaleX} yScale={this.scaleY} data={this.props.data}/>
			</g>
		)
	}
}

Path.propTypes = {
	dimensions: PropTypes.object
};


export default Path;