const nodeMailer = require('nodemailer');
const config = require('./config/default.json');
const jwt = require('jsonwebtoken');

const helper = {};

/* Send mail */
helper.sendEmail = async (from, to, subject, message) => {
  try {
    let transporter = nodeMailer.createTransport({
      host: config.MAIL.HOST,
      port: config.MAIL.PORT,
      secure: config.MAIL.SSL,
      auth: {
        user: config.MAIL.USERNAME,
        pass: config.MAIL.PASSWORD
      }
    })

    let info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: message
    });

    console.log("Message sent " + info.messageId);
  } catch (err) {
    console.log(err);
  }
}

/* Create JWT Token */
helper.createJwtToken = async (user) => {
  try {
    const key = config.JWT.KEY;
    const payload = {
      user: {
        id: user._id,
      },
    };
    const accessToken = await jwt.sign(payload, key, { expiresIn: 60 });
    return accessToken;
  } catch (err) {
    return false;
  }
  
}

/* Export all helper functions */
module.exports = helper;