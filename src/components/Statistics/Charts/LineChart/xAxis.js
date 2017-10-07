import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class AxisX extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.renderAxis();
	}

	componentDidUpdate() {
		this.renderAxis();
	}

	renderAxis() {
		const domain = [d3.min(this.props.data, (o)=> {
			return o.date;
		}), d3.max(this.props.data, (o)=> {
			return o.date;
		})];
		const scaleX = d3.scaleTime()
			.domain(domain)
			.range([0, this.props.dimensions.width - this.props.dimensions.padding]);
		const node = this.refs.axis;
		const tickCount = Math.round(node.getBBox().width/100);
		const axis = d3.axisBottom(scaleX).ticks(tickCount || 5);
		d3.select(node).call(axis);
	}

	render() {
		const translate = `translate(0, ${this.props.dimensions.height - this.props.dimensions.padding})`;
		return (
			<g className="axis x" ref="axis" transform={translate}/>
		)
	}
}

AxisX.propTypes = {
	data: PropTypes.array,
	dimensions: PropTypes.object
};

export default AxisX;