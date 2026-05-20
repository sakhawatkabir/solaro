import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const district = await prisma.district.findUnique({
      where: { id },
    });

    if (!district) {
      return NextResponse.json(
        { error: "District not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ district });
  } catch (error) {
    console.error("Get district error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const existing = await prisma.district.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "District not found" },
        { status: 404 },
      );
    }

    const updateData = {};

    if (body.name !== undefined) updateData.name = body.name;
    if (body.division !== undefined) updateData.division = body.division;
    if (body.solarPotential !== undefined)
      updateData.solarPotential = body.solarPotential;
    if (body.coverage !== undefined) updateData.coverage = body.coverage;
    if (body.population !== undefined)
      updateData.population = body.population
        ? parseInt(body.population)
        : null;
    if (body.avgSunHours !== undefined)
      updateData.avgSunHours = body.avgSunHours
        ? parseFloat(body.avgSunHours)
        : null;

    const district = await prisma.district.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, district });
  } catch (error) {
    console.error("Update district error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A district with this name already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const existing = await prisma.district.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { error: "District not found" },
        { status: 404 },
      );
    }

    await prisma.district.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete district error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
