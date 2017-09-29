import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Statistics from './Statistics/Statistics';
import UsersListContainer from './UsersTable/UserList.container';
import NavBar from './NavBar/NavBar.container';
import ConfigPanelContainer from './ConfigPanel/ConfigPanel.container';
import styles from '../shared/stylesheets/base.scss';

const App = function () {
	return (
		<div>
			<NavBar/>
			<ConfigPanelContainer/>
			<Switch>
				<div className={styles.mainContainer}>
					<Route exact path="/" component={Statistics}/>
					<Route exact path="/statistics" component={Statistics}/>
					<Route exact path="/usersList" component={UsersListContainer}/>
				</div>
			</Switch>
		</div>
	);
};

export default App;