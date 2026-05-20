import { NextResponse } from "next/server";
import { NewPasswordSchema } from "@/lib/auth/schemas";
import { getPasswordResetTokenByToken } from "@/lib/password-reset-token";
import { getUserByEmail } from "@/lib/auth/user";
import { hashPassword } from "@/lib/auth/password";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const validated = NewPasswordSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 400 },
      );
    }

    const { password, token } = validated.data;

    if (!token) {
      return NextResponse.json(
        { error: "Missing reset token" },
        { status: 400 },
      );
    }

    const resetToken = await getPasswordResetTokenByToken(token);
    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid reset token" },
        { status: 400 },
      );
    }

    if (new Date() > resetToken.expires) {
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(resetToken.email);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    await prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
