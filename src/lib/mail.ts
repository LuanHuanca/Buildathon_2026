import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST ?? "localhost",
  port: Number(process.env.SMTP_PORT ?? 1025),
  secure: false,
});

export async function sendMail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "Munay <no-reply@munay.local>",
    to,
    subject,
    text,
  });
}
