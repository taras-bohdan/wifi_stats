const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

const {PORT} = require('./config');

const map = require('lodash.map');
const cors = require('cors');
const omit = require('lodash.omit');

const dbConnector = require('./src/db/dbConnector');

//import facebook lib
const fbLogin = require('./src/routes/fb_login');
//facebook api end

import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/components/Statistics';
import {StaticRouter} from 'react-router-dom';
import {Provider} from 'react-redux';


app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

/**
 * get users from db
 */
app.get('/users', (req, res) => {
	dbConnector.getAllUsersInfo((data) => {
		res.send(data);
	});
});

app.get('/fbLogin', fbLogin.login);
app.get('/fbLoginSuccess', fbLogin.loginCallBack);

//redux
import {createStore} from 'redux';
import reducer from './src/redux/reducers/reducer';

import renderFullPage from './src/fullPage';
app.get('*', (req, res) => {
	const context = {};

	// const reducer = (state, action) => state;

	const preloadedState = {
		users: []
	};

	dbConnector.getAllUsersInfo((err, data) => {
		if (!err) {
			preloadedState.users = data;
		}

		const store = createStore(reducer, preloadedState);

		const finalState = store.getState();

		const html = renderToString(
			<Provider store={store}>
				<StaticRouter location={req.url}
							  context={context}>
					<App/>
				</StaticRouter>
			</Provider>
		);

		const template = renderFullPage(html, finalState);

		// context.url will contain the URL to redirect to if a <Redirect> was used
		if (context.url) {
			return res.send(template);
		} else {
			res.write(template);
			res.end();
		}
	});
});

app.listen(PORT, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});

app.post('/user', cors(), (req, res) => {
	dbConnector.addUserInfoToDB(req.body, () => {
		res.send('Added user info');
	});
});

app.post('/login', (req, res) => {
	const context = {};

	const initialState = {
		redirectData: req.body
	};

	const store = createStore(reducer, initialState);

	const finalState = store.getState();

	const html = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url}
						  context={context}>
				<App/>
			</StaticRouter>
		</Provider>
	);

	const template = renderFullPage(html, finalState);

	res.write(template);
	res.end();
});
