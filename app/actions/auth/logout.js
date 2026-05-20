"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { clearSessionCookies } from "./helpers";

export async function logoutAction() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (sessionToken) {
    await prisma.session.deleteMany({ where: { sessionToken } });
  }

  await clearSessionCookies(cookieStore);

  return { success: true };
}
