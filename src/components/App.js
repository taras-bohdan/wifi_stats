import React from 'react';
import {Route, Link} from 'react-router-dom';
import Statistics from './Statistics/Statistics';
import Login from './Login/Login';

const App = function () {
	return (
		<div>
			<Route exact path="/" component={Login}/>
			<Route path="/statistics" component={Statistics}/>
			<Route path="/login" component={Login}/>
		</div>
	);
};

export default App;