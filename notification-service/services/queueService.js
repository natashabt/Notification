const amqp = require('amqplib');
const config = require('../config');
const { sendEmail } = require('./emailService');
const { sendSMS } = require('./smsService');
const { sendInApp } = require('./inAppService');
const retryHandler = require('../utils/retryHandler');

let channel;

async function connect() {
  const conn = await amqp.connect(config.RABBITMQ_URL);
  channel = await conn.createChannel();
  await channel.assertQueue('notifications');

  channel.consume('notifications', async msg => {
    const notification = JSON.parse(msg.content.toString());
    try {
      if (notification.type === 'email') await sendEmail('recipient@example.com', notification.message);
      else if (notification.type === 'sms') await sendSMS('1234567890', notification.message);
      else await sendInApp(notification);
      channel.ack(msg);
    } catch (err) {
      await retryHandler.retryHandler(notification);
      channel.nack(msg);
    }
  });
}

exports.publish = async (notification) => {
  if (!channel) await connect();
  channel.sendToQueue('notifications', Buffer.from(JSON.stringify(notification)));
};