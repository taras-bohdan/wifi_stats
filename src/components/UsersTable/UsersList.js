import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
	paper: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
});


class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: props.users
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({users: nextProps.users});
	}

	render() {
		const classes = this.props.classes;

		let users = this.state.users.map((n) => {
			return (<TableRow key={n._id}>
				<TableCell numeric>{n.age}</TableCell>
				<TableCell>{n.sex}</TableCell>
				<TableCell numeric>{n.hospitalId}</TableCell>
				<TableCell>{n.dateAdded}</TableCell>
			</TableRow>)
		});

		return (
			<Paper className={classes.paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell numeric>Age</TableCell>
							<TableCell>Gender</TableCell>
							<TableCell numeric>Hospital Id</TableCell>
							<TableCell>Date Added</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users}
					</TableBody>
				</Table>
			</Paper>
		);

}
}

List.propTypes = {
	users: PropTypes.array.isRequired,
	username: PropTypes.string,
	dates: PropTypes.object
};

export default withStyles(styles)(List);
