import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UserStatistics from './UserStatistics';
import PieCharts from './Charts/PieCharts';
import LineChart from './Charts/LineChart/LineChart';
import styles from './Statistics.styles.scss';


class Stats extends PureComponent {
  render() {
    const linearChartDimensions = {
      width: 500,
      height: 300,
      padding: 30,
    };

    return (
      <div className={styles.statisticContainer}>
        <div className={styles.userListChart}>
          <LineChart
            dates={this.props.dateRange}
            data={this.props.users}
            dimensions={linearChartDimensions}
          />
          <PieCharts statistics={this.props.statistics} />
          <UserStatistics usersCount={this.props.usersCount} statistics={this.props.statistics} />
        </div>
      </div>
    );
  }
}

Stats.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object),
  usersCount: PropTypes.number,
  statistics: PropTypes.shape(PropTypes.object),
  dateRange: PropTypes.shape(PropTypes.object),
};

Stats.defaultProps = {
  users: [],
  usersCount: 0,
  statistics: {},
  dateRange: {},
};

export default Stats;
