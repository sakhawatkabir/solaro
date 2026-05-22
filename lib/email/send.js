import { transporter, EMAIL_FROM } from "./config";

export async function sendEmail({ to, subject, html }) {
  try {
    const info = await transporter.sendMail({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
    return { success: true, id: info.messageId };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
