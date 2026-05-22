import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export const EMAIL_FROM =
  process.env.EMAIL_FROM || process.env.GMAIL_USER || "noreply@solaro.com.bd";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
