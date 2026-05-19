import { NextResponse } from "next/server";
import { getVerificationTokenByToken } from "@/lib/verification-token";
import { getUserByEmail } from "@/lib/auth/user";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Missing verification token" },
        { status: 400 },
      );
    }

    const verificationToken = await getVerificationTokenByToken(token);
    if (!verificationToken) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 },
      );
    }

    if (new Date() > verificationToken.expires) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 },
      );
    }

    const user = await getUserByEmail(verificationToken.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: { id: verificationToken.id },
    });

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
