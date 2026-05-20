"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { formatUser } from "./helpers";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;

  if (!sessionToken) {
    return { authenticated: false };
  }

  const session = await prisma.session.findUnique({
    where: { sessionToken },
    include: { user: true },
  });

  if (!session || new Date() > session.expires) {
    if (session) {
      await prisma.session.delete({ where: { id: session.id } });
    }
    cookieStore.delete("sessionToken");
    return { authenticated: false };
  }

  return {
    authenticated: true,
    user: formatUser(session.user),
  };
}
