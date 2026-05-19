import { NextResponse } from "next/server";
import { ResetSchema } from "@/lib/auth/schemas";
import { getUserByEmail } from "@/lib/auth/user";
import { createPasswordResetToken } from "@/lib/password-reset-token";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ResetSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 },
      );
    }

    const { email } = validated.data;

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account with that email exists, a reset link has been sent.",
      });
    }

    const resetToken = await createPasswordResetToken(email);

    return NextResponse.json({
      success: true,
      message: "Reset link sent to email",
      resetToken: resetToken.token,
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
