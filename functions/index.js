const functions = require('firebase-functions');
const app  = require('../dist/server/firebase');

exports.app = functions.https.onRequest(app.init());