import React from 'react';
import PropTypes from 'prop-types';
import {LabeledArc} from './LabeledArc';
import * as d3 from 'd3';
import Chart from "../Chart";

class Piechart extends Chart {
	constructor() {
		super();

		this.pie = d3.pie()
			.value((d) => d.value);
		this.colors = d3.schemeCategory10;
	}

	componentDidMount(){
		super.componentDidMount();

		//set specific tooltip body
		this.tooltip.html((d) => {
			return `<div>Users: ${d.value}</div>`;
		});

		//show tooltip on mouse events
		this.svg.selectAll('path')
			.on('mouseover', (d) => this.tooltip.show(d))
			.on('mouseout', this.tooltip.hide)
	}

	arcGenerator(d, i) {
		return (
			<LabeledArc key={`arc-${i}`}
						data={d}
						innerRadius={this.props.innerRadius}
						outerRadius={this.props.outerRadius}
						color={this.colors[i]}/>
		);
	}

	render() {
		let pie = this.pie(this.props.data),
			translate = `translate(${this.props.x}, ${this.props.y})`;

		return (
			<svg ref={node => this.node = node} width={250} height={250}>
				<g transform={translate}>
					{pie.map((d, i) => this.arcGenerator(d, i))}
				</g>
			</svg>
		)
	}
}

Piechart.propTypes = {
	data: PropTypes.array,
	x: PropTypes.number,
	y: PropTypes.number,
	innerRadius: PropTypes.number,
	outerRadius: PropTypes.number
};

export default Piechart;