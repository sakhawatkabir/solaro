"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { getUserByEmail } from "@/lib/auth/user";
import { setSessionCookies, formatUser, SESSION_EXPIRY } from "./helpers";

const DEMO_USERS = {
  admin: {
    email: "demo.admin@solaro.com",
    name: "Demo Admin",
    role: "SUPER_ADMIN",
    permissions: [
      "analytics",
      "products",
      "orders",
      "customers",
      "leads",
      "districts",
      "users",
      "settings",
    ],
  },
  manager: {
    email: "demo.manager@solaro.com",
    name: "Demo Manager",
    role: "MANAGER",
    permissions: [
      "analytics",
      "products",
      "orders",
      "customers",
      "leads",
      "districts",
    ],
  },
  editor: {
    email: "demo.editor@solaro.com",
    name: "Demo Editor",
    role: "EDITOR",
    permissions: ["analytics", "products", "orders"],
  },
  support: {
    email: "demo.support@solaro.com",
    name: "Demo Support",
    role: "SUPPORT",
    permissions: ["analytics", "orders", "customers"],
  },
  viewer: {
    email: "demo.user@solaro.com",
    name: "Demo User",
    role: "VIEWER",
    permissions: ["analytics"],
  },
  custom: {
    email: "demo.custom@solaro.com",
    name: "Demo Custom",
    role: "CUSTOM",
    permissions: ["analytics", "products"],
  },
};

export async function demoLoginAction(roleKey) {
  try {
    const demoConfig = DEMO_USERS[roleKey];
    if (!demoConfig) {
      return { error: "Invalid demo role" };
    }

    let user = await getUserByEmail(demoConfig.email);

    if (!user) {
      const hashedPassword = await hashPassword("demo123456");

      user = await prisma.user.create({
        data: {
          name: demoConfig.name,
          email: demoConfig.email,
          password: hashedPassword,
          emailVerified: new Date(),
          role: demoConfig.role,
          status: "ACTIVE",
          permissions: demoConfig.permissions,
        },
      });
    } else if (!user.emailVerified) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }

    const sessionToken = crypto.randomUUID();
    const expires = new Date(Date.now() + SESSION_EXPIRY);

    await Promise.all([
      prisma.session.create({
        data: { sessionToken, userId: user.id, expires },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() },
      }),
    ]);

    const cookieStore = await cookies();
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
  } catch (error) {
    console.error("Demo login error:", error);
    return { error: "Demo login failed" };
  }
}
