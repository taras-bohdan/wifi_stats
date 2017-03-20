const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const assert = require('assert');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8080;
const map = require('lodash.map');
const isEqual = require('lodash.isequal');
const cors = require('cors');
const omit = require('lodash.omit');

import React from 'react';
import {renderToString} from 'react-dom/server';
import App from './src/components/app';
import template from './src/template';


const url = isEqual(process.env.NODE_ENV, 'production') ? 'mongodb://db_admin:123qwe@ds123080.mlab.com:23080/heroku_k2k6l934' :
	'mongodb://localhost:27017/wifi_statistics';

// using webpack-dev-server and middleware in development environment
/*if (process.env.NODE_ENV !== 'production') {
 let webpackDevMiddleware = require('webpack-dev-middleware'),
 webpackHotMiddleware = require('webpack-hot-middleware'),
 webpack = require('webpack'),
 config = require('./webpack.config'),
 compiler = webpack(config);

 app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config[1].output.publicPath}));
 app.use(webpackHotMiddleware(compiler));
 }*/

app.use(express.static(path.join(__dirname, 'dist')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

/*app.get('/', function (request, response) {
 response.sendFile(__dirname + '/dist/index.html')
 });*/

/*app.get('/', (req, res) => {
	const appString = renderToString(<App name="server side rendering"/>);

	res.send(template({
		body: appString,
		title: 'Hello World from the server'
	}));
});*/

app.get('/', (req, res) => {
	MongoClient.connect(url, function (err, db) {
		if (err != null) {
			res.status(400).send("Cannot connect to DB!");
		}
		else {
			console.log("Connected correctly to server");
			getAllUsersInfo(db, (data) => {
				/*let usersInfo = map(data, (n) => {
					return omit(n, ['_id']);
				});*/

				const appString = renderToString(<App users={data} name="server side rendering"/>);
				{/*const appString = renderToString(<App users={usersInfo} name="server side rendering"/>);*/}

				res.send(template({
					body: appString,
					title: 'Hello World from the server'
				}));

				db.close();
			});
		}
	});
});

app.listen(PORT, (error) => {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});


app.get('/users', (req, res) => {
	MongoClient.connect(url, function (err, db) {
		if (err != null) {
			res.status(400).send("Cannot connect to DB!");
		}
		else {
			console.log("Connected correctly to server");
			getAllUsersInfo(db, (data) => {
				let usersInfo = map(data, (n) => {
					return omit(n, ['_id']);
				});
				res.send(usersInfo);
				db.close();
			});
		}
	});
});

app.post('/user', cors(), (req, res) => {
	MongoClient.connect(url, (err, db) => {
		if (err != null) {
			res.status(400).send('Cannot connect to DB!');
		}
		else {
			console.log('Connected correctly to DB');
			addUserInfo(req.body, db, () => {
				db.close();
				res.status(200).send('User info added successfully');
			});
		}
	});
});

let renderMainPage = function () {

};

let addUserInfo = function (userInfo, db, callback) {
	db.collection('users').insertOne(userInfo, function (err) {
		assert.equal(err, null);
		console.log("Inserted a document into the users collection.");
		callback();
	});
};

let getAllUsersInfo = function (db, callback) {
	let collection = db.collection('users');
	collection.find({}).toArray(function (err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
		callback(docs);
	});
};