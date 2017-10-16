import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import {PORT, isProduction} from './config';
import cors from 'cors';
import {getAllUsersInfo, addUserInfoToDB} from './src/db/dbConnector';
import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/components/App';
import {StaticRouter} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from './src/redux/reducers/index';
import renderFullPage from './src/fullPage';
import {Provider} from 'react-redux';
import moment from 'moment';
import winston from 'winston';

//material ui imports
import {SheetsRegistry} from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import preset from 'jss-preset-default';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import {teal, blueGrey} from 'material-ui/colors';


const app = express();

app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz';
	res.set('Content-Encoding', 'gzip');
	next();
});

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
		winston.log('info', `==> Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
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

	// Create a sheetsRegistry instance.
	const sheetsRegistry = new SheetsRegistry();

	// Create a theme instance.
	const theme = createMuiTheme({
		palette: {
			primary: teal,
			accent: blueGrey,
			type: 'light',
		},
	});

	// Configure JSS
	const jss = create(preset());
	jss.options.createGenerateClassName = createGenerateClassName;


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
		menuToggled: false,
		showAll: true,
		hospitals: [
			{id: 1, name: 'орлика', checked: true},
			{id: 8, name: '8-ма лікарня', checked: true},
			{id: 3, name: 'топольна', checked: true}
		]
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
					<JssProvider registry={sheetsRegistry} jss={jss}>
						<MuiThemeProvider theme={theme} sheetsManager={new Map()}>
							<App/>
						</MuiThemeProvider>
					</JssProvider>
				</Provider>
			</StaticRouter>
		);

		// Grab the CSS from our sheetsRegistry.
		const css = sheetsRegistry.toString();

		const template = renderFullPage(html, finalState, css);

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