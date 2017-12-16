import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  circle: {
    fill: theme.palette.primary[400],
  },
});

class Circles extends Component {
  componentDidMount() {
    this.drawCircles();
  }

  componentDidUpdate() {
    this.drawCircles();
  }

  drawCircles() {
    const circles = select(this.node)
      .selectAll('circle')
      .data(this.props.data);
    const { classes } = this.props;

    circles.enter()
      .append('circle')
      .attr('r', 4)
      .attr('class', classes.circle)
      .attr('key', (d, i) => `dot-${i}`)
      .merge(circles)
      .attr('cx', d => this.props.xScale(d.date))
      .attr('cy', d => this.props.yScale(d.usersCount));

    circles.exit().remove();
  }

  render() {
    return (<g
      ref={(node) => {
        this.node = node;
      }}
    />);
  }
}

Circles.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  classes: PropTypes.shape(PropTypes.object),
};

Circles.defaultProps = {
  data: [],
  classes: {},
};

export default withStyles(styles)(Circles);
