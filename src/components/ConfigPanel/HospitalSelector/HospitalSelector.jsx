import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
} from 'material-ui/List';
import Switch from 'material-ui/Switch';
import styles from './HospitalSelector.styles.scss';

const materialStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.background.paper,
  },
});

class HospitalSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: props.showAll,
      hospitals: props.hospitals,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      showAll: nextProps.showAll,
      hospitals: nextProps.hospitals,
    });
  }

  handleToggle(id) {
    if (!id) {
      return () => this.props.onShowAllHospitals(!this.state.showAll);
    }

    return () => {
      const hospital = this.props.hospitals.find(h => h.id === id);
      if (hospital) hospital.checked = !hospital.checked;

      // send checked hospitals ids
      this.props.onFilterByHospital(this.props.hospitals.filter(h => h.checked).map(hos => hos.id));
    };
  }

  render() {
    const { showAll, hospitals } = this.state;

    return (
      <div className={styles.tabs}>
        <List subheader={<ListSubheader>Hospitals</ListSubheader>}>
          <ListItem>
            <ListItemText primary="See All" />
            <ListItemSecondaryAction>
              <Switch
                onClick={this.handleToggle(0)}
                checked={showAll}
              />
            </ListItemSecondaryAction>
          </ListItem>

          {hospitals.map(hospital => (
            <ListItem key={hospital.id}>
              <ListItemText primary={hospital.name} />
              <ListItemSecondaryAction>
                <Switch
                  onClick={this.handleToggle(hospital.id)}
                  checked={hospital.checked}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>


      </div>
    );
  }
}

HospitalSelector.propTypes = {
  onFilterByHospital: PropTypes.func.isRequired,
  onShowAllHospitals: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  hospitals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(materialStyles)(HospitalSelector);
