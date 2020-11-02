const nodeMailer = require('nodemailer');
const config = require('../config/default.json');

const userMail = async (email, subject, html) => {
  try {
    let transporter = nodeMailer.createTransport({
      host: "smtp.hostinger.in",
      port: 587,
      secure: false,
      auth: {
        user: config.MAIL.USERNAME,
        pass: config.MAIL.PASSWORD
      }
    });
  
    let info = await transporter.sendMail({
      from: '"XYZ Solutions" <admin@anilraj.space>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: html, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = userMail;