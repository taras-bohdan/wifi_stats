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
import App from './src/components/Statistics';
import {StaticRouter} from 'react-router-dom';
import Template from './src/Template'

const url = isEqual(process.env.NODE_ENV, 'production') ? 'mongodb://db_admin:123qwe@ds123080.mlab.com:23080/heroku_k2k6l934' :
	'mongodb://localhost:27017/wifi_statistics';

app.use(express.static(path.join(__dirname, 'dist')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

/**
 * get users from db
 */
app.get('/users', (req, res) => {
	MongoClient.connect(url, function (err, db) {
		if (err != null) {
			res.status(400).send("Cannot connect to DB!");
		}
		else {
			console.log("Connected correctly to server");
			getAllUsersInfo(db, (data) => {
				res.send(data);
				db.close();
			});
		}
	});
});

app.get('*', (req, res, next) => {
	const context = {};

	let data = {};

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
		res.end()
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
		callback(docs);
	});
};