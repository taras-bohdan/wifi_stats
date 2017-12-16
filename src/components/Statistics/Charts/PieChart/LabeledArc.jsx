import React from 'react';
import Arc from './Arc';

class LabeledArc extends Arc {
  render() {
    const [labelX, labelY] = this.arc.centroid(this.props.data);
    const labelTranslate = `translate(${labelX}, ${labelY})`;

    const textStyle = {
      pointerEvents: 'none',
    };

    return (
      <g>
        {super.render()}
        <text transform={labelTranslate} textAnchor="middle" style={textStyle}>
          {this.props.data.data.label}
        </text>
      </g>
    );
  }
}

export default LabeledArc;
