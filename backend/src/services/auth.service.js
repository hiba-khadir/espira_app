import crypto from 'crypto';
import nodemailer from 'nodemailer';
import 'dotenv/config';
/**
 * Generates a 6-digit numeric OTP code.
 */
export function generateOtpCode() {
    return crypto.randomInt(100000, 999999).toString();
}
// Reuse a single transporter instance across calls
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, // e.g. smtp.gmail.com
    port: Number(process.env.MAIL_PORT) || 587,
    secure: process.env.MAIL_SECURE === 'true', // true for port 465, false for 587
    auth: {
        user: process.env.MAIL_USER, // your sender email address
        pass: process.env.MAIL_PASS, // app password or SMTP password
    },
});
/**
 * Sends an OTP code to the given email address via nodemailer.
 * @param email - Recipient's email address
 * @param otpCode - The 6-digit OTP to send
 */
export async function sendOtpEmail(email, otpCode) {
    await transporter.sendMail({
        from: `"Your App" <${process.env.MAIL_USER}>`,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is: ${otpCode}\n\nIt expires in 10 minutes.`,
        html: `
      <div style="font-family: sans-serif; max-width: 400px; margin: auto;">
        <h2>Verify your account</h2>
        <p>Use the code below to verify your account:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; margin: 24px 0;">
          ${otpCode}
        </div>
        <p style="color: #888; font-size: 13px;">This code expires in 10 minutes. Do not share it with anyone.</p>
      </div>
    `,
    });
}
