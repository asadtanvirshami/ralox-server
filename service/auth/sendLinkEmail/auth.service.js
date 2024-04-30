const nodemailer = require("nodemailer");

const sendEmailService = async (link, email) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    // host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: "raloxsoft@gmail.com",
      pass: "1YA8BmcNtsO2fbXa",
    },
  });
  await transporter.sendMail({
    from: `"Algorim Team" <algorimsoftware@outlook.com>`,
    to: `${email}`,
    subject: `Reset Password: Your verification email.`,
    html: ` <p>Dear 
    Esteemed Customer,</p>
      <p>We are pleased to inform you that a password reset request has been initiated for your account.</p>
      <p>To reset your password, please click on the following link:</p>
      <p><a href="${link}">Click here to verify.</a></p>
      <p>If you did not initiate this request or need further assistance, please contact our support team immediately.</p>
      <p>Thank you for choosing our services.</p>
      <p>Best Regards,</p>
      <p>The Algorim Team</p>`,
  });
};

module.exports = sendEmailService;
