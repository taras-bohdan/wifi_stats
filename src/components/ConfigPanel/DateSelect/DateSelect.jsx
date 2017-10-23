import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const materialStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const DATE_FORMAT = 'YYYY-MM-DD';

class DateSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: props.dateRange.start.format(DATE_FORMAT),
      endDate: props.dateRange.end.format(DATE_FORMAT),
    };
    this.handleChangeStart = props.onDateChangeStart;
    this.handleChangeEnd = props.onDateChangeEnd;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      startDate: nextProps.dateRange.start.format(DATE_FORMAT),
      endDate: nextProps.dateRange.end.format(DATE_FORMAT),
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Start Date"
          type="date"
          defaultValue={this.state.startDate}
          onChange={this.handleChangeStart}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="date"
          label="End Date"
          type="date"
          defaultValue={this.state.endDate}
          onChange={this.handleChangeEnd}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
}

DateSelect.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  dateRange: PropTypes.shape({
    start: PropTypes.object,
    end: PropTypes.object,
  }).isRequired,
  onDateChangeStart: PropTypes.func.isRequired,
  onDateChangeEnd: PropTypes.func.isRequired,
};

export default withStyles(materialStyles)(DateSelect);