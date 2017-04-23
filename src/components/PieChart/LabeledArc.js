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
					  textAnchor="middle" title={this.props.data.data.value}>
					{this.props.data.data.label}
				</text>
			</g>
		);
	}
}

export {LabeledArc};
