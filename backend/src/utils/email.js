// Resend is the class from the library!
const { Resend } = require('resend');
const dotenv = require('dotenv');
dotenv.config(); // loads the env file into the process.env!

const resend = new Resend(process.env.RESEND_API_KEY);

const SendEmail = async ({ from = 'GopherEvents <no-reply@gopherevent.com>', to, subject, text, html }) => {
    const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        text,
        html
    })

    return { data, error }
}

module.exports = SendEmail;
