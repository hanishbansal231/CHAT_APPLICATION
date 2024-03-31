import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const sendEmail = async (email, subject, message) => {
    try {

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            auth: {
                user: process.env.SMTP_FROM_EMAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const info = await transport.sendMail({
            from: process.env.SMTP_USERNAME,
            to: `${email}`,
            subject: `${subject}`,
            html: `${message}`,
        });

        // console.log(info)
        return info;

    } catch (error) {
        console.log(error.message);
    }
}

export default sendEmail;
