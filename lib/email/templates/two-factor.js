export function generateTwoFactorEmail(userName, code) {
  return {
    subject: "Your SOLARO verification code",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <tr>
            <td style="text-align: center; padding-bottom: 32px;">
              <span style="font-size: 24px; font-weight: 700; color: #166534;">SOLARO</span>
            </td>
          </tr>
          <tr>
            <td style="background: #ffffff; border-radius: 12px; padding: 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center;">
              <h1 style="margin: 0 0 16px; font-size: 24px; font-weight: 600; color: #1c1917;">Verification Code</h1>
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #44403c;">
                Hi ${userName}, use the code below to complete your sign-in.
              </p>
              <div style="display: inline-block; padding: 16px 32px; background-color: #f0fdf4; border: 2px dashed #166534; border-radius: 8px; margin: 16px 0;">
                <span style="font-size: 32px; font-weight: 700; letter-spacing: 8px; color: #166534; font-family: monospace;">${code}</span>
              </div>
              <p style="margin: 24px 0 0; font-size: 14px; color: #78716c;">
                This code will expire in 5 minutes. If you didn't request this, please ignore this email.
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
