const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const MongoClient = require('mongodb').MongoClient;

const {PORT, DB_URL}= require('./config');

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
import Template from './src/Template'

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
	MongoClient.connect(DB_URL, function (err, db) {
		if (err != null) {
			res.status(400).send("Cannot connect to DB!");
		}
		else {
			console.log("Connected correctly to server");
			dbConnector.getAllUsersInfo(db, (data) => {
				res.send(data);
				db.close();
			});
		}
	});
});

app.get('/fbLogin', fbLogin.login);
app.get('/fbLoginSuccess', fbLogin.loginCallBack);

app.get('*', (req, res) => {
	const context = {};

	let data = {};

	/**
	 * probably I can add initial data here
	 * something like data.initialState = getDataFromDb()
	 * and then create global variable with user data inside <script> tags
	 * in Template.js file
	 */

	data.children = renderToString(
		<StaticRouter location={req.url}
					  context={context}>
			<App/>
		</StaticRouter>
	);

	let template = renderToString(<Template {...data} />);

	// context.url will contain the URL to redirect to if a <Redirect> was used
	if (context.url) {
		return res.send(`<!DOCTYPE html>${template}`);
	} else {
		res.write(template);
		res.end();
	}

});

app.listen(PORT, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});

app.post('/user', cors(), (req, res) => {
	dbConnector.addUserInfoToDB(req.body, () => {
		res.send('Added user info');
	});
});