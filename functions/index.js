const functions = require('firebase-functions');
const app  = require('./server/firebase');

exports.app = functions.https.onRequest(app.init());