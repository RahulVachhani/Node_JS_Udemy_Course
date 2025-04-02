import { EMAIL_USER, EMAIL_PASS } from '../env.js'
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
    },
})

export const mailOptions = (email) => ({
    from: EMAIL_USER,
    to: email,
    subject: 'Welcome to Our App!',
    html: `<h1>Welcome!</h1>
           <p>Thank you for registering. Your account has been created successfully.</p>
           <p>Enjoy using our service!</p>`,
})

export const mailOptionsForReserPassword = (email, token) => ({
    from: EMAIL_USER,
    to: email,
    subject: 'Password Reset',
    html: `
    <p>You requested a password reset</p>
    <p> Click this <a href="http://localhost:3022/reset/${token}">link</a> to set a new password </p>
    `,
})

export default { transporter, mailOptions }
