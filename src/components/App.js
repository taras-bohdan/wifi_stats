import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom'
import Statistics from './Statistics';
import Login from './Login/Login'
import PrivacyPolicy from './PrivacyPolicy';

const App = function () {
	return (
		<div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/login">Login</Link></li>
				<li><Link to="/privacy">Privacy Policy</Link></li>
			</ul>
			<hr/>

			<Route exact path="/" component={Statistics}/>
			<Route path="/login" component={Login}/>
			<Route path="/privacy" component={PrivacyPolicy}/>
		</div>
	);
};

export default App;