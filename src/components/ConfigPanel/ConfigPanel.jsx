import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import { withStyles } from 'material-ui/styles';
import DateSelectContainer from './DateSelect/DateSelect.container';
import HospitalSelectorContainer from './HospitalSelector/HospitalSelector.container';

const styles = () => (
  {
    configPanel: {
      width: 250,
    },
  }
);

class ConfigPanel extends Component {
  constructor(props) {
    super(props);
    this.menuToggled = props.menuToggled;
    this.toggleMenu = props.onMenuToggle;
  }

  componentWillReceiveProps(newProps) {
    this.menuToggled = newProps.menuToggled;
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer open={this.menuToggled} onRequestClose={this.toggleMenu}>
        <div tabIndex={0} role="button">
          <div className={classes.configPanel}>
            <HospitalSelectorContainer />
            <Divider />
            <DateSelectContainer />
          </div>
        </div>
      </Drawer>
    );
  }
}

ConfigPanel.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  menuToggled: PropTypes.bool.isRequired,
  classes: PropTypes.shape({}),
};

ConfigPanel.defaultProps = {
  classes: {},
};

export default withStyles(styles)(ConfigPanel);
