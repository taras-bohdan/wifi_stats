import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Table, {
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TableSortLabel,
	TableFooter,
	TablePagination
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import UserInfoDialogContainer from './UserInfoDialog/UserInfoDialog.container';

const styles = theme => ({
	paper: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	tableRow: {
		cursor: 'pointer'
	}
});


class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: this.sliceUsers(props)
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			users: this.sliceUsers(nextProps)
		});
	}

	createSortHandler(property) {
		let order = this.props.order || 'asc';
		return () => {
			order = order === 'asc' ? 'desc' : 'asc';
			this.props.onRequestSort(property, order);
		}
	}

	sliceUsers(props) {
		const {page, rowsPerPage, users} = props;
		return users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
	}

	handleChangePage(event, page) {
		this.props.onPageChange(page);
	}

	handleChangeRowsPerPage(event) {
		this.props.onRowsPerPageChange(event.target.value);
	}

	handleRowClick(userInfo) {
		return () => this.props.onRowClick(userInfo);
	}

	render() {
		const {order, orderBy, classes, page, rowsPerPage} = this.props;

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

		let users = this.state.users.map((n) => {
			return (<TableRow key={n._id}
							  hover={true}
							  className={classes.tableRow}
							  onClick={this.handleRowClick(n).bind(this)}
			>
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
							{columnHeaders}
						</TableRow>
					</TableHead>
					<TableBody>
						{users}
					</TableBody>
					<TableFooter>
						<TablePagination
							count={this.props.users.length}
							rowsPerPage={rowsPerPage}
							rowsPerPageOptions={[10, 25, 50, 100]}
							page={page}
							onChangePage={this.handleChangePage.bind(this)}
							onChangeRowsPerPage={this.handleChangeRowsPerPage.bind(this)}
						/>
					</TableFooter>
				</Table>
				<UserInfoDialogContainer/>
			</Paper>
		);

	}
}

List.propTypes = {
	users: PropTypes.array.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string,
	onRequestSort: PropTypes.func.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func.isRequired,
	onRowClick: PropTypes.func.isRequired,
	classes: PropTypes.object,
	page: PropTypes.number,
	rowsPerPage: PropTypes.number,
};

export default withStyles(styles)(List);
