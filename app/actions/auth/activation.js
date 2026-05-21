"use server";

import { prisma } from "@/lib/prisma";
import { resend } from "@/lib/resend";
import { activationEmailTemplate } from "@/lib/email-templates/activation";
import { randomBytes } from "crypto";
import { requireAdmin } from "@/app/actions/server-auth";

export async function sendActivationEmail(userId) {
  await requireAdmin();
  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("User not found");

    const token = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        email: user.email,
        token,
        expires,
      },
    });

    const activationUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/activate?token=${token}`;

    await resend.emails.send({
      from: "Solaro <noreply@solaro.com>",
      to: user.email,
      subject: "Activate Your Solaro Account",
      html: activationEmailTemplate({
        name: user.name,
        activationUrl,
      }),
    });

    return { success: true };
  } catch (error) {
    console.error("Send activation email error:", error);
    throw new Error("Failed to send activation email");
  }
}

export async function activateUser(token, password) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken) {
      throw new Error("Invalid activation token");
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({ where: { token } });
      throw new Error("Activation token has expired");
    }

    const user = await prisma.user.findUnique({
      where: { email: verificationToken.email },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const bcrypt = await import("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        emailVerified: new Date(),
        status: "ACTIVE",
      },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return { success: true };
  } catch (error) {
    console.error("Activate user error:", error);
    throw error;
  }
}
