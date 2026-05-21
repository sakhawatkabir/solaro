"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/auth/user";
import { hashPassword } from "@/lib/auth/password";
import {
  getPasswordResetTokenByToken,
  createPasswordResetToken,
} from "@/lib/password-reset-token";
import { sendEmail } from "@/lib/email/send";
import { generatePasswordResetEmail } from "@/lib/email/templates/password-reset";
import { APP_URL } from "@/lib/email/config";
import { ResetSchema, NewPasswordSchema } from "@/lib/auth/schemas";

export async function forgotPasswordAction(email) {
  const validated = ResetSchema.safeParse({ email });
  if (!validated.success) {
    return { error: "Invalid email" };
  }

  const user = await getUserByEmail(email);
  if (!user) {
    return {
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    };
  }

  const resetToken = await createPasswordResetToken(email);
  const resetUrl = `${APP_URL}/reset-password?token=${resetToken.token}`;
  const emailTemplate = generatePasswordResetEmail(
    user.name || "User",
    resetUrl,
  );
  const emailResult = await sendEmail({ to: email, ...emailTemplate });

  if (!emailResult.success) {
    console.error("Failed to send password reset email:", emailResult.error);
  }

  return {
    success: true,
    message:
      "If an account with that email exists, a reset link has been sent.",
  };
}

export async function resetPasswordAction(password, token) {
  const validated = NewPasswordSchema.safeParse({ password, token });
  if (!validated.success) {
    return { error: "Invalid password" };
  }

  if (!token) {
    return { error: "Missing reset token" };
  }

  const resetToken = await getPasswordResetTokenByToken(token);
  if (!resetToken) {
    return { error: "Invalid reset token" };
  }

  if (new Date() > resetToken.expires) {
    return { error: "Reset token has expired" };
  }

  const user = await getUserByEmail(resetToken.email);
  if (!user) {
    return { error: "User not found" };
  }

  const hashedPassword = await hashPassword(password);

  await Promise.all([
    prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    }),
    prisma.passwordResetToken.delete({ where: { id: resetToken.id } }),
  ]);

  return { success: true, message: "Password updated successfully" };
}
