"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/auth/user";
import { createVerificationToken } from "@/lib/verification-token";
import { sendEmail } from "@/lib/email/send";
import { generateVerificationEmail } from "@/lib/email/templates/verification";
import { APP_URL } from "@/lib/email/config";

export async function verifyEmailAction(token) {
  if (!token) {
    return { error: "Missing verification token" };
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return { error: "Invalid verification token" };
  }

  if (new Date() > verificationToken.expires) {
    return { error: "Verification token has expired" };
  }

  const user = await getUserByEmail(verificationToken.email);
  if (!user) {
    return { error: "User not found" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({
    where: { id: verificationToken.id },
  });

  return { success: true, message: "Email verified successfully" };
}

export async function resendVerificationAction(email) {
  if (!email || typeof email !== "string") {
    return { error: "Email is required" };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      success: true,
      message:
        "If an account with that email exists, a verification link has been sent.",
    };
  }

  if (user.emailVerified) {
    return { error: "Email is already verified. Please sign in." };
  }

  const verificationToken = await createVerificationToken(email);
  const verificationUrl = `${APP_URL}/verify-email?token=${verificationToken.token}`;
  const emailTemplate = generateVerificationEmail(
    user.name || "User",
    verificationUrl,
  );
  const emailResult = await sendEmail({ to: email, ...emailTemplate });

  if (!emailResult.success) {
    return { error: "Failed to send verification email. Please try again." };
  }

  return {
    success: true,
    message:
      "If an account with that email exists, a verification link has been sent.",
  };
}
