import nodemailer from 'nodemailer';

function setup() {
    return nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
}

export function sendConfirmationEmail(user) {
    let transport = setup();
    const mailOptions = {
        from: '"Bookworm" <info@bookworm.com>',
        to: user.email,
        subject: "Please confirm your email",
        text: `
        Thank you for signing up on Bookworm.com. Please confirm your account by following the link below.
        ${user.generateConfirmationUrl()}
        `
    }
    transport.sendMail(emailOptions);
};