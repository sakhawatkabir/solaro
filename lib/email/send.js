import { resend, EMAIL_FROM } from "./config";

export async function sendEmail({ to, subject, html }) {
  try {
    const data = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject,
      html,
    });
    return { success: true, id: data.id };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error };
  }
}
