"use server";

import nodemailer from "nodemailer";

interface MailOptions {
  to: string;
  subject: string;
  html: string;
}


export async function sendEmail({
  to,
  subject,
  html,
}: MailOptions) {
  if (!process.env.MAIL_SERVICE) {
    throw new Error("MMAIL_SERVICE environment variable is not set");
  }
  if (!process.env.MAIL_USER) {
    throw new Error("MAIL_USER environment variable is not set");
  }
  if (!process.env.MAIL_PASS) {
    throw new Error("MAIL_PASS environment variable is not set");
  }
  if (!process.env.MAIL_HOST) {
    throw new Error("MAIL_HOST environment variable is not set");
  }
  if (!process.env.EMAIL_FROM) {
    throw new Error("EMAIL_FROM environment variable is not set");
  }

  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"BloomKnot 🎀" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    })

    if (info.rejected.length !== 0) {
      throw new Error(`Failed to send email to ${info.rejected.join(", ")}`);
    }

    return {
      success: true,
      messageId: info.messageId,
    };

  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    }
  }
}