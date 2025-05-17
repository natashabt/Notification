const Notification = require('../models/Notification');

exports.sendInApp = async (notification) => {
  console.log(`In-app notification for user ${notification.userId}: ${notification.message}`);
};