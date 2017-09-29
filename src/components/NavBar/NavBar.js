import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {withStyles} from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import css from './NavBar.styles.scss';

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
						<IconButton onClick={this.toggleMenu} className={this.classes.menuButton} color="contrast"
									aria-label="Menu">
							<MenuIcon/>
						</IconButton>
						<Typography type="title" color="inherit" className={this.classes.flex}>
							Statistics
						</Typography>
						<Link className={css.tabLink} to="/statistics">
							<Button color="contrast">Statistics</Button>
						</Link>
						<Link className={css.tabLink} to="/usersList">
							<Button color="contrast">Users List</Button>
						</Link>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(NavBar);