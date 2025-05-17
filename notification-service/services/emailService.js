const nodemailer = require('nodemailer');
const config = require('../config');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.EMAIL_USER,
    pass: config.EMAIL_PASS
  }
});

exports.sendEmail = async (to, message) => {
  await transporter.sendMail({
    from: config.EMAIL_USER,
    to,
    subject: 'Notification',
    text: message
  });
};