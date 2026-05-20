"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword } from "@/lib/auth/password";

export async function updateProfileAction(name, password, newPassword) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return { error: "Not authenticated" };
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!session || new Date() > session.expires) {
    return { error: "Session expired" };
  }

  const updates = {};

  if (name) {
    updates.name = name;
  }

  if (password && newPassword) {
    if (newPassword.length < 8) {
      return { error: "New password must be at least 8 characters" };
    }
    const passwordValid = await verifyPassword(
      password,
      session.user.password,
    );
    if (!passwordValid) {
      return { error: "Current password is incorrect" };
    }
    updates.password = await hashPassword(newPassword);
  }

  if (Object.keys(updates).length === 0) {
    return { error: "No fields to update" };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: updates,
  });

  return { success: true, message: "Profile updated successfully" };
}
