const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');

const auth = {
    auth: {
        api_key: process.env.API_KEY ||  '456dd1f84eb590bbb2ed21f2f9545eac-aa4b0867-9c4976bf',
        domain: process.env.DOMAIN || 'sandboxec62728c966e4013b235be7af85f84fc.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email, 
        to: 'marioballestero.rdg@gmail.com',
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;