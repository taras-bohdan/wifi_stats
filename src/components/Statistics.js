import React, {Component} from 'react';
import PropTypes from 'prop-types';
import StatsContainer from './Stats.container';

class Statistics extends Component {
	constructor(props) {
		super(props);
		let users = [];

		if (props.users) {
			users = props.users.filter(user => {
				return new Date(user.dateAdded) > props.dateRange.start && new Date(user.dateAdded) < props.dateRange.end
			})
		}

		this.state = {
			originalUsers: users || [],
			users: users || [],
			dateRange: props.dateRange
		};
	}

	render() {
		return (
			<StatsContainer/>
		)
	}
}

Statistics.propTypes = {
	users: PropTypes.array,
	dateRange: PropTypes.object
};

export default Statistics;