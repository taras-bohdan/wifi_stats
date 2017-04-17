const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const assert = require('assert');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const {PORT, DB_URL}= require('./config');

const map = require('lodash.map');
const cors = require('cors');
const omit = require('lodash.omit');

//import facebook lib
const {Facebook, FacebookApiException} = require('fb');
const FB_OPTIONS = {
	appId: 1837990633109597,
	appSecret: '51931bf0757480210a45125e61e175e1',
	redirectUri: 'http://localhost:8080/fbLoginSuccess',
	version: 'v2.8'
};
const FB = new Facebook(FB_OPTIONS);

const FB_LOGIN_URL = FB.getLoginUrl({
	scope: 'email,user_likes',
	redirect_uri: 'http://localhost:8080/login',
	// redirect_uri: 'http://localhost:8080/fbLoginSuccess',
	responseType: 'token'
});

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
			getAllUsersInfo(db, (data) => {
				res.send(data);
				db.close();
			});
		}
	});
});

app.get('/fbLogin', (req, res) => {
	res.redirect(FB_LOGIN_URL);
});

app.get('/fbLoginSuccess', (req, res) => {
	FB.api('oauth/access_token', {
		client_id: FB_OPTIONS.appId,
		client_secret: FB_OPTIONS.appSecret,
		grant_type: 'client_credentials'
	}, function (res) {
		if (!res || res.error) {
			console.log(!res ? 'error occurred' : res.error);
			return;
		}

		var accessToken = res.access_token;

		FB.options({accessToken: accessToken});

		FB.api('/me', function (res) {
			if(res && res.error) {
				if(res.error.code === 'ETIMEDOUT') {
					console.log('request timeout');
				}
				else {
					console.log('error', res.error);
				}
			}
			else {
				console.log(res);
			}
		});
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
	MongoClient.connect(DB_URL, (err, db) => {
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