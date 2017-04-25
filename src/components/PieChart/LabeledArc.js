import Arc from './Arc';
import React from 'react';

class LabeledArc extends Arc {
	render() {
		let [labelX, labelY] = this.arc.centroid(this.props.data),
			labelTranslate = `translate(${labelX}, ${labelY})`;

		const textStyle = {
			pointerEvents: 'none'
		};

		return (
			<g>
				{super.render()}
				<text transform={labelTranslate}
					  textAnchor="middle"
					  style={textStyle}>
					{this.props.data.data.label}
				</text>
			</g>
		);
	}
}

export {LabeledArc};
