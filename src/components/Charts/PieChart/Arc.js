import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {select, arc} from 'd3';

class Arc extends Component {
	constructor() {
		super();

		this.arc = arc();
	}

	componentWillMount() {
		this.updateD3(this.props);
	}

	componentDidMount(){
		select(this.node).data([this.props.data.data]);
	}

	componentWillReceiveProps(newProps) {
		this.updateD3(newProps);
	}

	updateD3(newProps) {
		this.arc.innerRadius(newProps.innerRadius);
		this.arc.outerRadius(newProps.outerRadius);
	}

	render() {
		return (
			<path ref={node => this.node = node} d={this.arc(this.props.data)} style={{fill: this.props.color}}/>
		);
	}
}

Arc.propTypes = {
	data: PropTypes.object,
	color: PropTypes.string.isRequired
};

export default Arc;