import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { min, max, scaleTime, axisBottom, select } from 'd3';

class AxisX extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const domain = [min(this.props.data, o => o.date), max(this.props.data, o => o.date)];
    const scaleX = scaleTime()
      .domain(domain)
      .range([0, this.props.dimensions.width - this.props.dimensions.padding]);
    const tickCount = Math.round(this.node.getBBox().width / 100);
    const axis = axisBottom(scaleX).ticks(tickCount || 5);
    select(this.node).call(axis);
  }

  render() {
    const translate = `translate(0, ${this.props.dimensions.height - this.props.dimensions.padding})`;
    return (
      <g
        ref={(node) => {
          this.node = node;
        }}
        className="axis x"
        transform={translate}
      />
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
