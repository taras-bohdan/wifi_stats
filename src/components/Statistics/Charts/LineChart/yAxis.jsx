import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { max } from 'd3-array';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisLeft } from 'd3-axis';

class AxisY extends Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    const domain = [0, max(this.props.data, (o) => {
      return o.usersCount;
    })];
    const scaleY = scaleLinear()
      .domain(domain)
      .range([this.props.dimensions.height - this.props.dimensions.padding,
        this.props.dimensions.padding]);

    const node = this.refs.axis;
    const axis = axisLeft(scaleY);
    select(node).call(axis.ticks(5, 's'));
  }

  render() {
    const translate = `translate(${this.props.dimensions.padding}, 0)`;
    return (
      <g className="axis y" ref="axis" transform={translate} />
    );
  }
}

AxisY.propTypes = {
  dimensions: PropTypes.shape(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};

AxisY.defaultProps = {
  dimensions: {},
  data: [],
};

export default AxisY;
