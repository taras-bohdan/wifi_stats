import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './Login/Login';
import Statistics from './Statistics/Statistics';

const App = function () {
	return (
		<div>
			<Switch>
				<Route exact path="/" component={Statistics}/>
				<Route exact path="/login" component={Login}/>
				<Route exact path="/statistics" component={Statistics}/>
			</Switch>
		</div>
	);
};

export default App;