const PushNotificator = require('./PushNotificator');
const config = require('../config')
const instance = new PushNotificator(config.firebase);

module.exports = instance;

