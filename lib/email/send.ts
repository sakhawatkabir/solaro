import { resend, EMAIL_FROM } from "./config";

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Email] To: ${to} | Subject: ${subject}`);
    return { success: true, id: "dev-mode" };
  }

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
