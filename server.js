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

	getAllUsersInfo((err, data) => {
		if (!err) {
			preloadedState.users = data;
			preloadedState.originalUsers = data;
		}

		const store = createStore(reducer, {stats: preloadedState});

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

app.post('/login', (req, res) => {
	const context = {};
	const initialState = {
		redirectData: req.body
	};
	const store = createStore(reducer, {login: initialState});
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
