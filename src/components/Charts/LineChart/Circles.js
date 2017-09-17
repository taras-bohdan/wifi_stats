import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {select} from 'd3-selection';
import styles from './LineChart.styles.scss';

class Circles extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (<g ref={node => this.node = node} className={styles.circles}/>);
	}

	componentDidMount() {
		this.drawCircles();
	}

	componentDidUpdate() {
		this.drawCircles();
	}

	drawCircles(){
		const circles = select(this.node)
			.selectAll('circle')
			.data(this.props.data);

		circles.enter()
			.append('circle')
			.attr('r', 4)
			.attr('key', (d, i) => `dot-${i}`)
			.merge(circles)
			.attr('cx', (d) => this.props.xScale(d.date))
			.attr('cy', (d) => this.props.yScale(d.usersCount));

		circles.exit().remove();
	}
}

Circles.propTypes = {
	data: PropTypes.array,
	xScale: PropTypes.function,
	yScale: PropTypes.function
};

export default Circles;