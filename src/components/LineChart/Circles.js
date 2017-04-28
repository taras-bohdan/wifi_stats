import React, {Component} from 'react';

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
				<title>{userData.usersCount} users</title>
			</circle>;
		}
	};
};

export default Circles;