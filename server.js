const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const assert = require('assert');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = process.env.PORT || 8080;
const url = 'mongodb://localhost:27017/wifi_statistics';

// using webpack-dev-server and middleware in development environment
if (process.env.NODE_ENV !== 'production') {
	let webpackDevMiddleware = require('webpack-dev-middleware'),
		webpackHotMiddleware = require('webpack-hot-middleware'),
		webpack = require('webpack'),
		config = require('./webpack.config'),
		compiler = webpack(config);

	app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
	app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'dist')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (request, response) {
	response.sendFile(__dirname + '/dist/index.html')
});

app.listen(PORT, function (error) {
	if (error) {
		console.error(error);
	} else {
		console.info("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
	}
});


app.get('/users', function (req, res) {
	MongoClient.connect(url, function (err, db) {
		if (err != null) {
			res.status(400).send("Cannot connect to DB!");
		}
		else {
			console.log("Connected correctly to server");
			getAllUsersInfo(db, function (data) {
				res.send(data);
				db.close();
			});
		}
	});
});

app.post('/user', function (req, res) {
	MongoClient.connect(url, function (err, db) {
		if (err != null) {
			res.status(400).send("Cannot connect to DB!");
		}
		else {
			console.log("Connected correctly to DB");
			addUserInfo(req.body, db, function () {
				db.close();
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
		console.log("Found the following records");
		console.log(docs);
		callback(docs);
	});
};