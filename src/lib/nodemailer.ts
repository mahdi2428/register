import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "amirreza1379829@gmail.com",
      pass: 'llim tdny rlgj nzex'
    }
  });

  const resetLink = `http://localhost:3000/resetpassword/${token}`;

  await transporter.sendMail({
    from: "amirreza1379829@gmail.com",
    to: email,
    subject: 'درخواست تغییر رمز',
    html: `
      <p>\nروی لینک زیر برای تغییر رمز کلیک کنید</p>
      <a href="${resetLink}">تغییر رمز</a>
    `
  });
}