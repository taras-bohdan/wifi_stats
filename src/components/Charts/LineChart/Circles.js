import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
	circle: {
		fill: theme.palette.primary[400]
	}
});

class Circles extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<g ref={node => this.node = node}/>);
	}

	componentDidMount() {
		this.drawCircles();
	}

	componentDidUpdate() {
		this.drawCircles();
	}

	drawCircles() {
		const circles = select(this.node)
			.selectAll('circle')
			.data(this.props.data);
		const classes = this.props.classes;

		circles.enter()
			.append('circle')
			.attr('r', 4)
			.attr('class', classes.circle)
			.attr('key', (d, i) => `dot-${i}`)
			.merge(circles)
			.attr('cx', (d) => this.props.xScale(d.date))
			.attr('cy', (d) => this.props.yScale(d.usersCount));

		circles.exit().remove();
	}
}

Circles.propTypes = {
	data: PropTypes.array,
	xScale: PropTypes.any,
	yScale: PropTypes.any
};

export default withStyles(styles)(Circles);