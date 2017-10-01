import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {withStyles} from 'material-ui/styles';

const styles = theme => ({
	paper: theme.mixins.gutters({
		paddingTop: 16,
		paddingBottom: 16,
		marginTop: theme.spacing.unit * 3,
		marginBottom: theme.spacing.unit * 3,
	}),
	valueLabel: {
		color: theme.palette.primary[500]
	}
});

class UserStatistics extends Component {
	render() {
		let {classes, usersCount, statistics} = this.props;

		return (
			<Paper className={classes.paper} elevation={4}>
				<div className="statistics">
					<div>Total users: <span>{usersCount}</span></div>
					<Divider light/>
					<div>Age:
						{
							statistics.ageStats.map(stats => (
								<div key={stats.label}>
									<span className={classes.valueLabel}>{stats.label}: </span>
									<span>{stats.percentage}%</span>
									<Divider light/>
								</div>
							))
						}
					</div>
				</div>
			</Paper>
		)
	}
}

UserStatistics.propTypes = {
	usersCount: PropTypes.number,
	statistics: PropTypes.object,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserStatistics);