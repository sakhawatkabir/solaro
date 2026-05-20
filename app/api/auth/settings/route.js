import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, hashPassword } from "@/lib/auth/password";
import { SettingsSchema } from "@/lib/auth/schemas";

export async function PATCH(request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("sessionToken")?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 },
      );
    }

    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });

    if (!session || new Date() > session.expires) {
      return NextResponse.json(
        { error: "Session expired" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const validated = SettingsSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: "Invalid fields" },
        { status: 400 },
      );
    }

    const { name, password, newPassword } = validated.data;
    const updates = {};

    if (name) {
      updates.name = name;
    }

    if (password && newPassword) {
      const passwordValid = await verifyPassword(password, session.user.password);
      if (!passwordValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 400 },
        );
      }
      updates.password = await hashPassword(newPassword);
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: updates,
    });

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
    });
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
