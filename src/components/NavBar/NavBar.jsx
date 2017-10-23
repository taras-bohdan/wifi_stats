import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  tabLink: {
    margin: '0 10px',
    textDecoration: 'none',
    color: theme.palette.text,
    '&:visited': {
      color: theme.palette.text,
    },
  },
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = props.onMenuToggle;
    this.classes = props.classes;
  }

  render() {
    return (
      <div className={this.classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              onClick={this.toggleMenu}
              className={this.classes.menuButton}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className={this.classes.flex}>
              Statistics
            </Typography>
            <Link className={this.classes.tabLink} href="/statistics" to="/statistics">
              <Button color="contrast">Statistics</Button>
            </Link>
            <Link className={this.classes.tabLink} href="/usersList" to="/usersList">
              <Button color="contrast">Users List</Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

NavBar.propTypes = {
  onMenuToggle: PropTypes.func.isRequired,
  classes: PropTypes.shape(PropTypes.object).isRequired,
};

export default withStyles(styles)(NavBar);
