import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/app/actions/notifications";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const status = searchParams.get("status") || "";
    const productId = searchParams.get("productId") || "";
    const rating = searchParams.get("rating") || "";

    const where = {};
    if (status) where.status = status;
    if (productId) where.productId = productId;
    if (rating) where.rating = parseInt(rating);

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.review.count({ where }),
    ]);

    const avgWhere = { status: "APPROVED" };
    if (productId) avgWhere.productId = productId;

    const avgRating = await prisma.review.aggregate({
      where: avgWhere,
      _avg: { rating: true },
      _count: true,
    });

    return NextResponse.json({
      reviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
      stats: {
        avgRating: avgRating._avg.rating || 0,
        totalReviews: avgRating._count,
      },
    });
  } catch (error) {
    console.error("Reviews list error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, rating, title, comment, productId } =
      body;

    if (!customerName || !customerEmail || !rating || !comment) {
      return NextResponse.json(
        { error: "Name, email, rating, and comment are required" },
        { status: 400 },
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 },
      );
    }

    const review = await prisma.review.create({
      data: {
        customerName,
        customerEmail,
        rating: parseInt(rating),
        title: title || null,
        comment,
        productId: productId || null,
        status: "PENDING",
      },
    });

    await createNotification({
      type: "REVIEW",
      title: `New Review: ${"★".repeat(parseInt(rating))}`,
      message: `${customerName} submitted a review${title ? ` - "${title}"` : ""}`,
      link: `/admin/reviews`,
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error("Create review error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
