const nodemailer = require('nodemailer');

const mailer = async (option) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: 'dcvinit1742@gmail.com',
            pass: 'nulcgelznzylbdch'
        },
        tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
        }
    });

    const mailOptions = {
        from: 'Technetic <abc@gmail.com>',
        to: option.email,
        subject: option.subject,
        text: option.text,
        html: option.html
    };

    transporter.sendMail(mailOptions)
        .then(info => {
            console.log(info);
        }).catch(err => {
            console.log(err);
        });
}

module.exports = mailer;
