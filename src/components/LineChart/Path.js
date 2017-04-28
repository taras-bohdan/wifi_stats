import React, {Component} from 'react';
import * as d3 from "d3";

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
		let x = d3.scaleTime().range([this.props.dimensions.padding, newProps.dimensions.width - this.props.dimensions.padding * 2]),
			y = d3.scaleLinear().range([newProps.dimensions.height - this.props.dimensions.padding, this.props.dimensions.padding]);
		// Scale the range of the data
		x.domain(d3.extent(newProps.data, function (d) {
			return d.date;
		}));
		y.domain([0, d3.max(newProps.data, function (d) {
			return d.usersCount;
		})]);

		this.valueLine = d3.line()
			.x(function (d) {
				return x(new Date(d.date));
			})
			.y(function (d) {
				return y(d.usersCount);
			})
			// .curve(d3.curveBasis);
	}


	render() {

		return (
			<path className="line" d={this.valueLine(this.props.data)}/>
		)
	}
}


export default Path;