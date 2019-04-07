const functions = require('firebase-functions');
const app  = require('./server/firebase');

// set env
const config = functions.config()

if (config.eth && config.app) {
  process.env.SERVER_ENV_WEB3_HOST = config.eth.host
  process.env.SERVER_ENV_TOKEN_ADDRESS = config.eth.tokenaddress
  process.env.SERVER_ENV_APP_HOST = config.app.host
}

exports.app = functions.https.onRequest(app.init());