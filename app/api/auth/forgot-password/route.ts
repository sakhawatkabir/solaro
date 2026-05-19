import { NextResponse } from "next/server";
import { ResetSchema } from "@/lib/auth/schemas";
import { getUserByEmail } from "@/lib/auth/user";
import { createPasswordResetToken } from "@/lib/password-reset-token";
import { sendEmail } from "@/lib/email/send";
import { generatePasswordResetEmail } from "@/lib/email/templates/password-reset";
import { APP_URL } from "@/lib/email/config";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ResetSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { email } = validated.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, a reset link has been sent.",
      });
    }

    const resetToken = await createPasswordResetToken(email);
    const resetUrl = `${APP_URL}/reset-password?token=${resetToken.token}`;
    const emailTemplate = generatePasswordResetEmail(
      user.name || "User",
      resetUrl,
    );
    await sendEmail({ to: email, ...emailTemplate });

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
