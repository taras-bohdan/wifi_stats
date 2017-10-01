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
		let {users, classes} = this.props;

		let usersCount = users.length;

		let age = {
			'<18': users.filter((user) => user.age === "<18" || user.age < 18).length,
			'18-25': users.filter((user) => user.age === "18-25" || (user.age >= 18 && user.age < 25)).length,
			'25-50': users.filter((user) => user.age === "25-50" || user.age >= 25 && user.age < 50).length,
			'>50': users.filter((user) => user.age === ">50" || user.age >= 50).length,
			'na': users.filter((user) => user.age === undefined).length
		};

		function getPercent(value) {
			if (usersCount && value) {
				return Math.round(value / usersCount * 100);
			}
			return 0;
		}

		return (
			<Paper className={classes.paper} elevation={4}>
				<div className="statistics">
					<div>Total users: <span>{usersCount}</span></div>
					<Divider light />
					<div>Age:
						<div>less than 18: {age['<18']} user(s): <span className={classes.valueLabel}>{getPercent(age['<18'])}%</span></div>
						<Divider light />
						<div>18-25: {age['18-25']} user(s): <span className={classes.valueLabel}>{getPercent(age['18-25'])}%</span></div>
						<Divider light />
						<div>25-50: {age['25-50']} user(s): <span className={classes.valueLabel}>{getPercent(age['25-50'])}%</span></div>
						<Divider light />
						<div>&gt;50: {age['>50']} user(s): <span className={classes.valueLabel}>{getPercent(age['>50'])}%</span></div>
						<Divider light />
						<div>age not specified: {age['na']} user(s): <span className={classes.valueLabel}>{getPercent(age['na'])}%</span></div>
					</div>
				</div>
			</Paper>
		)
	}
}

UserStatistics.propTypes = {
	users: PropTypes.array,
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserStatistics);