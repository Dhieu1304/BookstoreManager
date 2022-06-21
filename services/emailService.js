const nodemailer = require("nodemailer");

module.exports.sendEmail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL_APP,
                    pass: process.env.EMAIL_APP_PASSWORD,
                },
            });

            let send = await transporter.sendMail({
                from: '"BookStore" <none@example.com>',
                to: data.receiverEmail,
                subject: data.subject,
                html: data.content,
            });

            if (send) {
                resolve(send);
            } else {
                resolve(false);
            }

        } catch (e) {
            reject(e);
        }
    })
}
