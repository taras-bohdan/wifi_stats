import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import startCase from 'lodash/startCase';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  propLabel: {
    color: theme.palette.primary[500],
  },
});

class UserInfoDialog extends Component {
  constructor(props) {
    super(props);

    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleRequestClose() {
    this.props.onUserInfoDialogClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Dialog open={this.props.open} transition={Slide} onRequestClose={this.handleRequestClose}>
          <DialogTitle>User Information</DialogTitle>
          <DialogContent>
            {
              this.props.data && Object.keys(this.props.data).map((key) => {
                return key !== '_id' ? (
                  <DialogContentText key={key}>
                    <span className={classes.propLabel}>{startCase(key)}: </span>
                    <span>{this.props.data[key]}</span>
                  </DialogContentText>
                ) : '';
              })
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

UserInfoDialog.propTypes = {
  open: PropTypes.bool,
  data: PropTypes.shape(PropTypes.object),
  classes: PropTypes.shape(PropTypes.object).isRequired,
  onUserInfoDialogClose: PropTypes.func.isRequired,
};

UserInfoDialog.defaultProps = {
  open: false,
  data: {},
};

export default withStyles(styles)(UserInfoDialog);
