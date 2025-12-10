import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();

const SendEmail = async({to, subject, html})=>{
     const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
     })
     await transporter.sendMail({
        from : process.env.FROM_EMAIL,
        to,
        subject,
        html,
     })
}
export default SendEmail;