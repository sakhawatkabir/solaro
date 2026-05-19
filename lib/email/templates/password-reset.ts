import { APP_URL } from "./config";

export function generatePasswordResetEmail(
  userName: string,
  resetUrl: string,
) {
  return {
    subject: "Reset your SOLARO password",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset your password</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <span style="font-size: 24px; font-weight: 700; color: #166534;">SOLARO</span>
            </td>
          </tr>
          <tr>
            <td style="background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #1c1917;">Reset your password</h1>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #44403c;">
                Hi ${userName}, we received a request to reset your password. Click the button below to create a new one.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center; padding: 24px 0;">
                    <a href="${resetUrl}" style="display: inline-block; padding: 14px 32px; background-color: #166534; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #78716c;">
                Or copy and paste this link into your browser:<br>
                <span style="color: #166534; word-break: break-all;">${resetUrl}</span>
              </p>
              <p style="margin: 24px 0 0; font-size: 14px; color: #78716c;">
                This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="text-align: center; padding-top: 32px; font-size: 12px; color: #78716c;">
              <p style="margin: 0;">SOLARO Energy &middot; Dhaka, Bangladesh</p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `,
  };
}
