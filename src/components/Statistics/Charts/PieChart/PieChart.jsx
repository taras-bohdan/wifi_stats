import React from 'react';
import PropTypes from 'prop-types';
import { pie } from 'd3';
import { teal, blueGrey, blue, green, indigo, amber, cyan } from 'material-ui/colors';
import LabeledArc from './LabeledArc';
import Chart from '../Chart';

class Piechart extends Chart {
  constructor() {
    super();

    this.pie = pie()
      .value(d => d.value);
    this.colors = [
      teal[500],
      blue[500],
      amber[500],
      indigo[500],
      cyan[500],
      blueGrey[500],
      green[500],
    ];
  }

  componentDidMount() {
    super.componentDidMount();

    // set specific tooltip body
    this.tooltip.html(d => (`<div>Users: ${d.value}</div>`));

    this.applyMouseEvents();
  }

  componentDidUpdate() {
    this.applyMouseEvents();
  }

  applyMouseEvents() {
    // show tooltip on mouse events
    this.svg.selectAll('path')
      .on('mouseover', d => this.tooltip.show(d))
      .on('mouseout', this.tooltip.hide);
  }

  arcGenerator(d, i) {
    return (
      <LabeledArc
        key={`arc-${i}`}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={this.colors[i]}
      />
    );
  }

  render() {
    const pieChart = this.pie(this.props.data);
    const translate = `translate(${this.props.x}, ${this.props.y})`;

    return (
      <svg
        ref={(node) => {
          this.node = node;
        }}
        width={250}
        height={250}
      >
        <g transform={translate}>
          {pieChart.map((d, i) => {
            if (d.data && d.data.value) {
              // create arc and labels only if data is not empty
              return this.arcGenerator(d, i);
            }
            return null;
          })}
        </g>
      </svg>
    );
  }
}

Piechart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  x: PropTypes.number,
  y: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
};

export default Piechart;
