import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import {PORT, isProduction} from './config';
import cors from 'cors';
import {getAllUsersInfo, addUserInfoToDB} from './src/db/dbConnector';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/components/Statistics/Statistics';
import {StaticRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from './src/redux/reducers/index';
import renderFullPage from './src/fullPage';
import {Provider} from 'react-redux';
import moment from 'moment';
import winston from 'winston';

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

/**
 * get users from db
 */
app.get('/users', (req, res) => {
	getAllUsersInfo((data) => {
		res.send(data);
	});
});

app.listen(PORT, (error) => {
	if (error) {
		winston.log('error', error);
	} else {
		winston.log('info', `server is running in ${isProduction ? 'Production' : 'Development'} mode`);
		winston.log('info', '==> Listening on port %s. Visit http://localhost:%s/ in your browser.', PORT, PORT);
	}
});

// set the view engine to ejs
app.set('view engine', 'ejs');
app.post('/login', (req, res) => {
	const userData = req.body;
	res.render(__dirname + "/../public/loginPage/login", {userData: userData});
});
app.get('/login', (req, res) => {
	const userData = req.body;
	res.render(path.resolve(__dirname + "/../public/loginPage/login"), {userData: userData});
});

app.get('*', (req, res) => {
	const context = {};

	const preloadedState = {
		users: [],
		originalUsers: [],
		dateRange: {
			start: moment().startOf('month'),
			end: moment().endOf('month')
		}
	};

	const appState = {
		menuToggled: false
	};

	getAllUsersInfo((err, data) => {
		if (!err) {
			preloadedState.users = data;
			preloadedState.originalUsers = data;
		}

		const store = createStore(reducer, {
			stats: preloadedState,
			usersList: preloadedState,
			appState: appState
		});

		const finalState = store.getState();

		const html = renderToString(
			<StaticRouter location={req.url}
						  context={context}>
				<Provider store={store}>
					<App/>
				</Provider>
			</StaticRouter>
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

app.post('/addUser', cors(), (req, res) => {
	addUserInfoToDB(req.body, () => {
		res.send('Added user info');
	});
});