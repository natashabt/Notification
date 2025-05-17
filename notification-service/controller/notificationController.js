const Notification = require('../models/Notification');
const queueService = require('../services/queueService');

exports.sendNotification = async (req, res) => {
  const { userId, type, message } = req.body;
  const notification = new Notification({ userId, type, message });
  await notification.save();
  await queueService.publish(notification);
  res.status(201).json({ success: true, message: 'Notification queued' });
};

exports.getUserNotifications = async (req, res) => {
  const notifications = await Notification.find({ userId: req.params.id });
  res.json(notifications);
};