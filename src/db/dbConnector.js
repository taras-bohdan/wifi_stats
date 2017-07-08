import MongoClient from 'mongodb';
import assert from 'assert';
import isNull from 'lodash.isnull';
import {DB_URL} from '../../config';
import winston from 'winston';


function addUserInfo(userInfo, db, callback) {
	//add date to user info
	userInfo.dateAdded = new Date();
	db.collection('users').insertOne(userInfo, function (err) {
		assert.equal(err, null);
		winston.log('info', 'Inserted a document into the users collection.');
		callback();
	});
}

export let getAllUsersInfo = function (callback) {
	connectToDb(db => {
		let collection = db.collection('users');
		collection.find({}).toArray(function (err, docs) {
			assert.equal(err, null);
			callback(null, docs);
			db.close();
		});
	}, err => {
		winston.log('error', err.message);
		callback(err);
	});
};

export let addUserInfoToDB = function (userInfo, callback) {
	MongoClient.connect(DB_URL, (err, db) => {
		if (!isNull(err)) {
			winston.log('error', 'Cannot connect to DB!');
		}
		else {
			winston.log('info', 'Connected correctly to DB');
			addUserInfo(userInfo, db, () => {
				db.close();
				winston.log('info', 'User info added successfully');
				if (typeof callback === 'function') {
					callback();
				}
			});
		}
	});
};

/**
 * Connect to database
 * @param successCallBack - function executed after successfully connected to database
 * @param errorCallback - function executed after on connection fail
 */
function connectToDb(successCallBack, errorCallback) {
	MongoClient.connect(DB_URL, (err, db) => {
		if (!isNull(err)) {
			winston.log('error', 'Cannot connect to DB!');
			errorCallback(err);
		}
		else {
			winston.log('info', 'Connected correctly to DB');
			successCallBack(db);
		}
	});
}