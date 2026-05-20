import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "ACTIVE";

    const where = {};

    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }
    if (category && category !== "all") {
      where.category = category;
    }
    if (status && status !== "all") {
      where.status = status;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Products list error:", error);
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
      category,
      price,
      originalPrice,
      stock,
      status,
      description,
      badge,
      image,
      images,
      specs,
      includes,
      savings,
      suitableFor,
    } = body;

    if (!name || !category || !price) {
      return NextResponse.json(
        { error: "Name, category, and price are required" },
        { status: 400 },
      );
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        category,
        price: parseInt(price),
        originalPrice: originalPrice ? parseInt(originalPrice) : null,
        stock: parseInt(stock) || 0,
        status: status || "ACTIVE",
        description: description || null,
        badge: badge || null,
        image: image || null,
        images: images || [],
        specs: specs ? JSON.parse(specs) : null,
        includes: includes ? JSON.parse(includes) : null,
        savings: savings ? JSON.parse(savings) : null,
        suitableFor: suitableFor ? JSON.parse(suitableFor) : null,
      },
    });

    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A product with this name already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
