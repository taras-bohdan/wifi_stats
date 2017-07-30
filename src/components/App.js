import React from 'react';
import {Route, Link} from 'react-router-dom';
import Statistics from './Statistics';
import Login from './Login/Login';

const App = function () {
	return (
		<div>
			<div className="links">
				<div className="button-link">
					<Link to="/">Home</Link>
				</div>
				<div className="button-link">
					<Link to="/login">Login</Link>
				</div>
			</div>
			<Route exact path="/" component={Statistics}/>
			<Route path="/login" component={Login}/>
		</div>
	);
};

export default App;