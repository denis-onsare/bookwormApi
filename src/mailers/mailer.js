import nodemailer from 'nodemailer';

export function sendConfirmationEmail(user) {
    let transport = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS
        }
      });
    let mailOptions = {
        from: '"Bookworm" <info@bookworm.com>',
        to: user.email,
        subject: "Please confirm your email",
        text: `
        Thank you for signing up on Bookworm.com. Please confirm your account by following the link below.
        ${user.generateConfirmationUrl()}
        `
    };
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    });
};