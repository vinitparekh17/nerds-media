const nodemailer = require('nodemailer');
const webhook = require('./webhook');

const mailer = async (option) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'technetic.co.in@gmail.com',
            pass: 'hgfzvwocaabbcues'
        },
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        }
    });

    const mailOptions = {
        from: 'Technetic <technetic.co.in@gmail.com>',
        to: option.email,
        subject: option.subject,
        text: option.text,
        html: option.html
    };

    transporter.sendMail(mailOptions)
        .then(info => {
            console.log(info);
        }).catch(err => {
            webhook(`\`\`\`js\n${err}\`\`\``);
            console.log(err);
        });
}

module.exports = mailer;
