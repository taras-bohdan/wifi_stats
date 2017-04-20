const MongoClient = require('mongodb').MongoClient;
const {DB_URL}= require('../../config');
const assert = require('assert');


function addUserInfo(userInfo, db, callback) {
	db.collection('users').insertOne(userInfo, function (err) {
		assert.equal(err, null);
		console.log("Inserted a document into the users collection.");
		callback();
	});
}

export let getAllUsersInfo = function (db, callback) {
	let collection = db.collection('users');
	collection.find({}).toArray(function (err, docs) {
		assert.equal(err, null);
		callback(docs);
	});
};

export let addUserInfoToDB = function (userInfo) {
	MongoClient.connect(DB_URL, (err, db) => {
		if (err != null) {
			console.error('Cannot connect to DB!');
		}
		else {
			console.log('Connected correctly to DB');
			addUserInfo(userInfo, db, () => {
				db.close();
				console.log('User info added successfully');
			});
		}
	});
};