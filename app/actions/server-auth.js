import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const allowedAdminRoles = [
  "SUPER_ADMIN",
  "MANAGER",
  "EDITOR",
  "SUPPORT",
  "CUSTOM",
];

export async function getServerSession() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;
    if (!sessionToken) return null;

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || new Date() > session.expires) {
      return null;
    }

    return session.user;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const user = await getServerSession();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (!allowedAdminRoles.includes(user.role)) {
    throw new Error("Forbidden: Admin access required");
  }
  return user;
}
