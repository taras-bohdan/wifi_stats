import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PieChart from './PieChart/PieChart';

class Charts extends PureComponent {
  render() {
    const innRadius = 50;
    const outRadius = 100;
    const x = 100;
    const y = 100;
    return (
      <div>
        <PieChart
          data={this.props.statistics.ageStats}
          innerRadius={innRadius}
          outerRadius={outRadius}
          x={x}
          y={y}
        />
        <PieChart
          data={this.props.statistics.genderStats}
          innerRadius={innRadius}
          outerRadius={outRadius}
          x={x}
          y={y}
        />
      </div>
    );
  }
}

Charts.propTypes = {
  statistics: PropTypes.shape(PropTypes.object),
};

Charts.defaultProps = {
  statistics: {},
};

export default Charts;
