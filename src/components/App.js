import React, {Component} from 'react';
import { Route, Link } from 'react-router-dom'
import Statistics from './Statistics';
import Login from './Login'

const App = function (props) {
	return (
		<div>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/login">Login</Link></li>
			</ul>
			<hr/>

			<Route exact path="/" component={Statistics}/>
			<Route path="/login" component={Login}/>
		</div>
	);
};

export default App;