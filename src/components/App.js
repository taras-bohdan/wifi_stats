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
			<Route exact path="/" component={Login}/>
			<Route path="/login" component={Login}/>
			<Route path="/statistics" component={Statistics}/>
		</div>
	);
};

export default App;