"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/auth/user";
import { createTwoFactorToken } from "@/lib/two-factor-token";
import { createTwoFactorConfirmation } from "@/lib/two-factor-confirmation";
import { sendEmail } from "@/lib/email/send";
import { generateTwoFactorEmail } from "@/lib/email/templates/two-factor";
import { setSessionCookies, formatUser, SESSION_EXPIRY } from "./helpers";

export async function verify2FAAction(code) {
  if (!code || code.length !== 6) {
    return { error: "Invalid code" };
  }

  const cookieStore = await cookies();
  const pendingEmail = cookieStore.get("2fa-pending-email")?.value;

  if (!pendingEmail) {
    return { error: "No pending 2FA session" };
  }

  const user = await getUserByEmail(pendingEmail);
  if (!user) {
    return { error: "User not found" };
  }

  const twoFactorToken = await prisma.twoFactorToken.findFirst({
    where: { email: pendingEmail, token: code },
  });

  if (!twoFactorToken || new Date() > twoFactorToken.expires) {
    return { error: "Invalid or expired code" };
  }

  await prisma.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

  const existingConfirmation = await prisma.twoFactorConfirmation.findUnique({
    where: { userId: user.id },
  });
  if (existingConfirmation) {
    await prisma.twoFactorConfirmation.delete({
      where: { id: existingConfirmation.id },
    });
  }
  await createTwoFactorConfirmation(user.id);

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_EXPIRY);

  await prisma.session.create({
    data: { sessionToken, userId: user.id, expires },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  cookieStore.delete("2fa-pending-email");
  await setSessionCookies(
    cookieStore,
    sessionToken,
    user.role,
    user.permissions,
    expires,
  );

  return {
    success: true,
    user: formatUser(user),
  };
}

export async function send2FACodeAction(email) {
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found" };
  }

  const twoFactorToken = await createTwoFactorToken(email);
  const emailTemplate = generateTwoFactorEmail(
    user.name || "User",
    twoFactorToken.token,
  );
  const emailResult = await sendEmail({ to: email, ...emailTemplate });

  if (!emailResult.success) {
    return { error: "Failed to send verification code. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set("2fa-pending-email", email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 5 * 60,
    path: "/",
  });

  return { success: true, message: "Verification code sent to your email" };
}
