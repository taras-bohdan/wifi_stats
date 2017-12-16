import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { scaleTime, scaleLinear, max, extent, line } from 'd3';
import { withStyles } from 'material-ui/styles';
import Circles from './Circles';

const styles = theme => ({
  line: {
    stroke: theme.palette.primary[500],
    strokeWidth: 2,
    fill: 'none',
  },
});

class Path extends Component {
  constructor(props) {
    super(props);

    this.updateD3(props);
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(newProps) {
    // Set the ranges
    const xScale = scaleTime().range([this.props.dimensions.padding,
      newProps.dimensions.width - (this.props.dimensions.padding * 2)]);
    const yScale = scaleLinear().range([newProps.dimensions.height - this.props.dimensions.padding,
      this.props.dimensions.padding]);
    // Scale the range of the data
    xScale.domain(extent(newProps.data, d => d.date));
    yScale.domain([0, max(newProps.data, d => d.usersCount)]);

    this.valueLine = line()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScale(d.usersCount));
    this.scaleX = xScale;
    this.scaleY = yScale;
  }


  render() {
    const { classes } = this.props;
    return (
      <g>
        <path className={classes.line} d={this.valueLine(this.props.data)} />
        <Circles xScale={this.scaleX} yScale={this.scaleY} data={this.props.data} />
      </g>
    );
  }
}

Path.propTypes = {
  dimensions: PropTypes.shape(PropTypes.object),
  classes: PropTypes.shape(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};

Path.defaultProps = {
  dimensions: {},
  classes: {},
  data: [],
};

export default withStyles(styles)(Path);
