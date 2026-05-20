import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/auth/user";
import { createVerificationToken } from "@/lib/verification-token";
import { sendEmail } from "@/lib/email/send";
import { generateVerificationEmail } from "@/lib/email/templates/verification";
import { APP_URL } from "@/lib/email/config";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account with that email exists, a verification link has been sent.",
      });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified. Please sign in." },
        { status: 400 },
      );
    }

    const verificationToken = await createVerificationToken(email);
    const verificationUrl = `${APP_URL}/verify-email?token=${verificationToken.token}`;
    const emailTemplate = generateVerificationEmail(
      user.name || "User",
      verificationUrl,
    );
    const emailResult = await sendEmail({ to: email, ...emailTemplate });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Failed to send verification email. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "If an account with that email exists, a verification link has been sent.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
