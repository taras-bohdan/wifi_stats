import React, {Component} from 'react';
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
		/*var domain = [d3.min(this.props.data, (o)=> {
		 return o.usersCount;
		 }), d3.max(this.props.data, (o)=> {
		 return o.usersCount;
		 })];*/
		var domain = [0, d3.max(this.props.data, (o)=> {
			return o.usersCount;
		})];
		var scaleY = d3.scaleLinear()
			.domain(domain)
			.range([this.props.dimensions.height - this.props.dimensions.padding, this.props.dimensions.padding]);

		var node = this.refs.axis;
		var axis = d3.axisLeft(scaleY);
		d3.select(node).call(axis.ticks(5, "s"));
	}

	render() {
		const translate = `translate(${this.props.dimensions.padding}, 0)`;
		return (
			<g className="axis y" ref="axis" transform={translate}/>
		)
	}
}

export default AxisY;