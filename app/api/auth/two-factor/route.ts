import { NextResponse } from "next/server";
import { TwoFactorSchema } from "@/lib/auth/schemas";
import { getTwoFactorTokenByToken } from "@/lib/two-factor-token";
import { getUserByEmail } from "@/lib/auth/user";
import { createTwoFactorToken } from "@/lib/two-factor-token";
import { createTwoFactorConfirmation } from "@/lib/two-factor-confirmation";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { sendEmail } from "@/lib/email/send";
import { generateTwoFactorEmail } from "@/lib/email/templates/two-factor";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = TwoFactorSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid code" }, { status: 400 });
    }

    const { code, token } = validated.data;

    if (!token) {
      return NextResponse.json(
        { error: "Missing session token" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const pendingEmail = cookieStore.get("2fa-pending-email")?.value;

    if (!pendingEmail) {
      return NextResponse.json(
        { error: "No pending 2FA session" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(pendingEmail);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const twoFactorToken = await prisma.twoFactorToken.findFirst({
      where: { email: pendingEmail, token: code },
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

    cookieStore.delete("2fa-pending-email");
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
    console.error("2FA verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const twoFactorToken = await createTwoFactorToken(email);
    const emailTemplate = generateTwoFactorEmail(
      user.name || "User",
      twoFactorToken.token,
    );
    await sendEmail({ to: email, ...emailTemplate });

    const cookieStore = await cookies();
    cookieStore.set("2fa-pending-email", email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 5 * 60,
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Verification code sent to your email",
    });
  } catch (error) {
    console.error("2FA send code error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
