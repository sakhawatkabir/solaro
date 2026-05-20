import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const product = await prisma.product.findUnique({
      where: { id, status: "ACTIVE" },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Get product error:", error);
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

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const updateData = {};

    if (body.name !== undefined) {
      updateData.name = body.name;
      updateData.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (body.category !== undefined) updateData.category = body.category;
    if (body.price !== undefined) updateData.price = parseInt(body.price);
    if (body.originalPrice !== undefined)
      updateData.originalPrice = body.originalPrice
        ? parseInt(body.originalPrice)
        : null;
    if (body.stock !== undefined) updateData.stock = parseInt(body.stock);
    if (body.status !== undefined) updateData.status = body.status;
    if (body.description !== undefined)
      updateData.description = body.description;
    if (body.badge !== undefined) updateData.badge = body.badge;
    if (body.image !== undefined) updateData.image = body.image;
    if (body.images !== undefined) updateData.images = body.images;
    if (body.specs !== undefined)
      updateData.specs =
        typeof body.specs === "string" ? JSON.parse(body.specs) : body.specs;
    if (body.includes !== undefined)
      updateData.includes =
        typeof body.includes === "string"
          ? JSON.parse(body.includes)
          : body.includes;
    if (body.savings !== undefined)
      updateData.savings =
        typeof body.savings === "string"
          ? JSON.parse(body.savings)
          : body.savings;
    if (body.suitableFor !== undefined)
      updateData.suitableFor =
        typeof body.suitableFor === "string"
          ? JSON.parse(body.suitableFor)
          : body.suitableFor;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error("Update product error:", error);
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

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete product error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
