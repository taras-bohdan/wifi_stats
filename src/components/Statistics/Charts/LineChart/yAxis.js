import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

class AxisY extends Component {
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
		const domain = [0, d3.max(this.props.data, (o)=> {
			return o.usersCount;
		})];
		const scaleY = d3.scaleLinear()
			.domain(domain)
			.range([this.props.dimensions.height - this.props.dimensions.padding, this.props.dimensions.padding]);

		const node = this.refs.axis;
		const axis = d3.axisLeft(scaleY);
		d3.select(node).call(axis.ticks(5, "s"));
	}

	render() {
		const translate = `translate(${this.props.dimensions.padding}, 0)`;
		return (
			<g className="axis y" ref="axis" transform={translate}/>
		)
	}
}

AxisY.propTypes = {
	dimensions: PropTypes.object,
	data: PropTypes.array
};

export default AxisY;