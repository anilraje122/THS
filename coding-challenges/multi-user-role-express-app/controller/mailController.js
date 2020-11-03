const nodemailer = require("nodemailer");
const { MAIL } = require("../config/default.json");

sendEmail = async (subject, email, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.in",
      port: 587,
      secure: false,
      auth: {
        user: MAIL.USERNAME,
        pass: MAIL.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"XYZ Solutions" <admin@anilraj.space>',
      to: email,
      subject,
      html,
    });

    console.log(`Mail sent : ${info.messageId}`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendEmail;
