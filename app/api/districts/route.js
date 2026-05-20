import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";
    const division = searchParams.get("division") || "";
    const coverage = searchParams.get("coverage") || "";

    const where = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (division && division !== "all") {
      where.division = division;
    }
    if (coverage === "covered") {
      where.coverage = true;
    } else if (coverage === "uncovered") {
      where.coverage = false;
    }

    const [districts, total] = await Promise.all([
      prisma.district.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: "asc" },
      }),
      prisma.district.count({ where }),
    ]);

    return NextResponse.json({
      districts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Districts list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      division,
      solarPotential,
      coverage,
      population,
      avgSunHours,
    } = body;

    if (!name || !division) {
      return NextResponse.json(
        { error: "Name and division are required" },
        { status: 400 },
      );
    }

    const district = await prisma.district.create({
      data: {
        name,
        division,
        solarPotential: solarPotential || "MEDIUM",
        coverage: coverage || false,
        population: population ? parseInt(population) : null,
        avgSunHours: avgSunHours ? parseFloat(avgSunHours) : null,
      },
    });

    return NextResponse.json({ success: true, district }, { status: 201 });
  } catch (error) {
    console.error("Create district error:", error);
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
