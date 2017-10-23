import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TableFooter,
  TablePagination,
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import UserInfoDialogContainer from './UserInfoDialog/UserInfoDialog.container';

const styles = theme => ({
  paper: {
    width: '100%',
    marginTop: theme.mixins.toolbar.minHeight,
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer',
  },
});

/**
 * slice array of users to display single page
 * @param props {object} - should contain page number, number of rows per page and users array
 * @returns {array} - users list
 */
function sliceUsers(props) {
  const { page, rowsPerPage, users } = props;
  return users.length > page * rowsPerPage ?
    users.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage) : users;
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: sliceUsers(props),
    };

    // bind context to functions
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      users: sliceUsers(nextProps),
    });
  }

  createSortHandler(property) {
    let order = this.props.order || 'asc';
    return () => {
      order = order === 'asc' ? 'desc' : 'asc';
      this.props.onRequestSort(property, order);
    };
  }


  handleChangePage(event, page) {
    if (page !== -1) this.props.onPageChange(page);
  }

  handleChangeRowsPerPage(event) {
    this.props.onRowsPerPageChange(event.target.value);
  }

  handleRowClick(userInfo) {
    return () => this.props.onRowClick(userInfo);
  }

  render() {
    const {
      order,
      orderBy,
      classes,
      page,
      rowsPerPage,
    } = this.props;

    const columnData = [
      {
        id: 'age',
        label: 'Age',
        numeric: true,
        disablePadding: false,
      },
      {
        id: 'sex',
        label: 'Gender',
        numeric: false,
        disablePadding: false,
      },
      {
        id: 'hospitalId',
        label: 'Hospital Id',
        numeric: true,
        disablePadding: false,
      },
      {
        id: 'dateAdded',
        label: 'Date Added',
        numeric: false,
        disablePadding: false,
      },
    ];
    const columnHeaders = columnData.map(column => (
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
    ));

    const users = this.state.users.map(user => (
      <TableRow
        key={user._id}
        hover
        className={classes.tableRow}
        onClick={this.handleRowClick(user)}
      >
        <TableCell numeric>{user.age}</TableCell>
        <TableCell>{user.sex}</TableCell>
        <TableCell numeric>{user.hospitalId}</TableCell>
        <TableCell>{user.dateAdded}</TableCell>
      </TableRow>));

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
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableFooter>
        </Table>
        <UserInfoDialogContainer />
      </Paper>
    );

  }
}

List.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  classes: PropTypes.shape(PropTypes.object),
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

List.defaultProps = {
  orderBy: 'asc',
  classes: {},
  page: 1,
  rowsPerPage: 10,
};

export default withStyles(styles)(List);
