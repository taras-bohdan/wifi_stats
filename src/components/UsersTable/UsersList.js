import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {TableBody, TableCell, TableHead, TableRow, TableSortLabel} from 'material-ui/Table';
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

	createSortHandler(property) {
		let order = this.props.order || 'asc';
		return () => {
			order = order === 'asc' ? 'desc' : 'asc';
			this.props.onRequestSort(property, order);
		}
	}

	render() {
		const {order, orderBy, classes} = this.props;

		let users = this.state.users.map((n) => {
			return (<TableRow key={n._id}>
				<TableCell numeric>{n.age}</TableCell>
				<TableCell>{n.sex}</TableCell>
				<TableCell numeric>{n.hospitalId}</TableCell>
				<TableCell>{n.dateAdded}</TableCell>
			</TableRow>)
		});

		const columnData = [
			{
				id: 'age',
				label: 'Age',
				numeric: true,
				disablePadding: false
			},
			{
				id: 'sex',
				label: 'Gender',
				numeric: false,
				disablePadding: false
			},
			{
				id: 'hospitalId',
				label: 'Hospital Id',
				numeric: true,
				disablePadding: false
			},
			{
				id: 'dateAdded',
				label: 'Date Added',
				numeric: false,
				disablePadding: false
			}
		];

		const columnHeaders = columnData.map(column =>
			<TableCell
				key={column.id}
				numeric={column.numeric}
				disablePadding={column.disablePadding}
			>
				<TableSortLabel
					active={orderBy === column.id}
					direction={order}
					onClick={this.createSortHandler(column.id)}
				>
					{column.label}
				</TableSortLabel>
			</TableCell>
		);

		return (
			<Paper className={classes.paper}>
				<Table>
					<TableHead>
						<TableRow>
							{columnHeaders}
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
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string,
	onRequestSort: PropTypes.func,
	classes: PropTypes.object
};

export default withStyles(styles)(List);
