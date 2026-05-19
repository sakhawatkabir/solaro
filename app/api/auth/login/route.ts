import { NextResponse } from "next/server";
import { LoginSchema } from "@/lib/auth/schemas";
import { getUserByEmail } from "@/lib/auth/user";
import { verifyPassword } from "@/lib/auth/password";
import { createPasswordResetToken } from "@/lib/password-reset-token";
import { createTwoFactorToken } from "@/lib/two-factor-token";
import { createTwoFactorConfirmation } from "@/lib/two-factor-confirmation";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = LoginSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: validated.error.flatten() },
        { status: 400 },
      );
    }

    const { email, password, code } = validated.data;

    const user = await getUserByEmail(email);
    if (!user || !user.password) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    if (user.status === "INACTIVE" || user.status === "SUSPENDED") {
      return NextResponse.json(
        { error: "Account is disabled" },
        { status: 403 },
      );
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Email not verified", requiresVerification: true },
        { status: 403 },
      );
    }

    if (code) {
      const twoFactorToken = await prisma.twoFactorToken.findFirst({
        where: { email, token: code },
      });

      if (!twoFactorToken || new Date() > twoFactorToken.expires) {
        return NextResponse.json(
          { error: "Invalid or expired code" },
          { status: 401 },
        );
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
    const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
      data: {
        sessionToken,
        userId: user.id,
        expires,
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const cookieStore = await cookies();
    cookieStore.set("sessionToken", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
