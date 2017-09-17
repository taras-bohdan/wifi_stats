import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {scaleTime, scaleLinear, extent, max, line} from "d3";
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
		let xScale = scaleTime().range([this.props.dimensions.padding, newProps.dimensions.width - this.props.dimensions.padding * 2]),
			yScale = scaleLinear().range([newProps.dimensions.height - this.props.dimensions.padding, this.props.dimensions.padding]);
		// Scale the range of the data
		xScale.domain(extent(newProps.data, function (d) {
			return d.date;
		}));
		yScale.domain([0, max(newProps.data, function (d) {
			return d.usersCount;
		})]);

		this.valueLine = line()
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
	dimensions: PropTypes.object,
	data: PropTypes.array
};


export default Path;