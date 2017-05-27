import React, {Component, PropTypes} from 'react';

class Circles extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<g className="circles">{ this.props.data.map(renderCircles(this.props)) }</g>
		)
	}
}

const renderCircles = (props) => {
	return (userData, index) => {
		const circleProps = {
			cx: props.xScale(userData.date),
			cy: props.yScale(userData.usersCount),
			r: 4,
			key: `dot-${index}`
		};
		if (userData.usersCount) {
			return <circle {...circleProps}>
				<title>{userData.date.toLocaleDateString()} : {userData.usersCount} users</title>
			</circle>;
		}
	};
};

Circles.propTypes = {
	data: PropTypes.array
};

renderCircles.propTypes = {
	xScale: PropTypes.function,
	yScale: PropTypes.function
};

export default Circles;