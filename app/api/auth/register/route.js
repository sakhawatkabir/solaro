import { NextResponse } from "next/server";
import { RegisterSchema } from "@/lib/auth/schemas";
import { getUserByEmail } from "@/lib/auth/user";
import { hashPassword } from "@/lib/auth/password";
import { createVerificationToken } from "@/lib/verification-token";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email/send";
import { generateVerificationEmail } from "@/lib/email/templates/verification";
import { APP_URL } from "@/lib/email/config";

export async function POST(request) {
  try {
    const body = await request.json();
    const validated = RegisterSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid fields", details: validated.error.flatten() },
        { status: 400 },
      );
    }

    const { name, email, password } = validated.data;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      if (!existingUser.emailVerified) {
        return NextResponse.json(
          { error: "Email already registered but not verified" },
          { status: 409 },
        );
      }
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "VIEWER",
        status: "ACTIVE",
        permissions: ["analytics"],
      },
    });

    const verificationToken = await createVerificationToken(email);
    const verificationUrl = `${APP_URL}/api/auth/verify-email?token=${verificationToken.token}`;
    const emailTemplate = generateVerificationEmail(name, verificationUrl);
    await sendEmail({ to: email, ...emailTemplate });

    return NextResponse.json({
      success: true,
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
