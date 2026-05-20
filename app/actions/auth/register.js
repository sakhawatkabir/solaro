"use server";

import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/auth/user";
import { hashPassword } from "@/lib/auth/password";
import { createVerificationToken } from "@/lib/verification-token";
import { sendEmail } from "@/lib/email/send";
import { generateVerificationEmail } from "@/lib/email/templates/verification";
import { APP_URL } from "@/lib/email/config";
import { RegisterSchema } from "@/lib/auth/schemas";

export async function registerAction(name, email, password) {
  const validated = RegisterSchema.safeParse({ name, email, password });
  if (!validated.success) {
    return { error: "Invalid fields" };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    if (!existingUser.emailVerified) {
      return { error: "Email already registered but not verified" };
    }
    return { error: "Email already in use" };
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "VIEWER",
      status: "ACTIVE",
      permissions: ["analytics"],
    },
  });

  const verificationToken = await createVerificationToken(email);
  const verificationUrl = `${APP_URL}/verify-email?token=${verificationToken.token}`;
  const emailTemplate = generateVerificationEmail(name, verificationUrl);
  const emailResult = await sendEmail({ to: email, ...emailTemplate });

  if (!emailResult.success) {
    return { error: "Failed to send verification email. Please try again." };
  }

  return {
    success: true,
    message:
      "Registration successful. Please check your email to verify your account.",
  };
}
