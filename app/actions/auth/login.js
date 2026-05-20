"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getUserByEmail } from "@/lib/auth/user";
import { verifyPassword } from "@/lib/auth/password";
import { createTwoFactorConfirmation } from "@/lib/two-factor-confirmation";
import { LoginSchema } from "@/lib/auth/schemas";
import { setSessionCookies, formatUser, SESSION_EXPIRY } from "./helpers";

export async function loginAction(email, password, code) {
  const validated = LoginSchema.safeParse({ email, password, code });
  if (!validated.success) {
    return { error: "Invalid fields" };
  }

  const user = await getUserByEmail(email);
  if (!user || !user.password) {
    return { error: "Invalid credentials" };
  }

  if (user.status === "INACTIVE" || user.status === "SUSPENDED") {
    return { error: "Account is disabled" };
  }

  const passwordValid = await verifyPassword(password, user.password);
  if (!passwordValid) {
    return { error: "Invalid credentials" };
  }

  if (!user.emailVerified) {
    return { error: "Email not verified", requiresVerification: true };
  }

  if (code) {
    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email, token: code },
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
  }

  const sessionToken = crypto.randomUUID();
  const expires = new Date(Date.now() + SESSION_EXPIRY);

  await prisma.session.create({
    data: { sessionToken, userId: user.id, expires },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const cookieStore = await cookies();
  await setSessionCookies(cookieStore, sessionToken, user.role, expires);

  return {
    success: true,
    user: formatUser(user),
  };
}
