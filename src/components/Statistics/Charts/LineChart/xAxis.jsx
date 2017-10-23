import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { min, max } from 'd3-array';
import { scaleTime } from 'd3-scale';
import { axisBottom } from 'd3-axis';
import { select } from 'd3-selection';

class AxisX extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const domain = [min(this.props.data, (o) => {
      return o.date;
    }), max(this.props.data, o => o.date)];
    const scaleX = scaleTime()
      .domain(domain)
      .range([0, this.props.dimensions.width - this.props.dimensions.padding]);
    const node = this.refs.axis;
    const tickCount = Math.round(node.getBBox().width / 100);
    const axis = axisBottom(scaleX).ticks(tickCount || 5);
    select(node).call(axis);
  }

  render() {
    const translate = `translate(0, ${this.props.dimensions.height - this.props.dimensions.padding})`;
    return (
      <g className="axis x" ref="axis" transform={translate} />
    );
  }
}

AxisX.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  dimensions: PropTypes.shape(PropTypes.object),
};

AxisX.defaultProps = {
  data: [],
  dimensions: {},
};

export default AxisX;
