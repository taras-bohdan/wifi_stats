import MongoClient from 'mongodb';
import winston from 'winston';
import assert from 'assert';
import isNull from 'lodash/isNull';
import { DB_URL } from '../../config';

function addUserInfo(userInfo, db, callback) {
  const userInformation = userInfo;

  // add date to user info
  userInformation.dateAdded = new Date();

  db.collection('users').insertOne(userInformation, (err) => {
    assert.equal(err, null);
    winston.log('info', 'Inserted a document into the users collection.');
    callback();
  });
}

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
    } else {
      winston.log('info', 'Connected correctly to DB');
      successCallBack(db);
    }
  });
}

export const getAllUsersInfo = (callback) => {
  connectToDb((db) => {
    const collection = db.collection('users');
    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);
      callback(null, docs);
      db.close();
    });
  }, (err) => {
    winston.log('error', err.message);
    callback(err);
  });
};

export const addUserInfoToDB = (userInfo, callback) => {
  MongoClient.connect(DB_URL, (err, db) => {
    if (!isNull(err)) {
      winston.log('error', 'Cannot connect to DB!');
    } else {
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
