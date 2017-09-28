import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import MenuToggle from './MenuToggle/MenuToggle.container';
import styles from './NavBar.styles.scss';

export default class NavBar extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<nav className={styles.navBar}>
				<MenuToggle/>
				<div className={styles.tabLink}><Link to="/">Home</Link></div>
				<div className={styles.tabLink}><Link to="/statistics">Statistics</Link></div>
				<div className={styles.tabLink}><Link to="/users">Users List</Link></div>
			</nav>
		);
	}
}