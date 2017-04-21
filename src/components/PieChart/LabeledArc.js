import Arc from './Arc';
import React from 'react';

class LabeledArc extends Arc {
	render() {
		let [labelX, labelY] = this.arc.centroid(this.props.data),
			labelTranslate = `translate(${labelX}, ${labelY})`;

		return (
			<g>
				{super.render()}
				<text transform={labelTranslate}
					  textAnchor="middle">
					{this.props.data.data.label} - {this.props.data.data.value}
				</text>
			</g>
		);
	}
}

export { LabeledArc };
