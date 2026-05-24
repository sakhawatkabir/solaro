"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/actions/server-auth";

export async function getReviews({
  page = 1,
  perPage = 10,
  search = "",
  status = "",
  rating = "",
}) {
  await requireAdmin();

  const where = {};
  if (status && status !== "all") where.status = status;
  if (rating && rating !== "all") where.rating = parseInt(rating);
  if (search) {
    where.OR = [
      { customerName: { contains: search, mode: "insensitive" } },
      { customerEmail: { contains: search, mode: "insensitive" } },
      { comment: { contains: search, mode: "insensitive" } },
      { title: { contains: search, mode: "insensitive" } },
    ];
  }

  const [reviews, total, statusBreakdown] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.review.count({ where }),
    prisma.review.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),
  ]);

  return {
    reviews,
    pagination: {
      page,
      perPage,
      total,
      totalPages: Math.ceil(total / perPage),
    },
    statusBreakdown,
  };
}

export async function updateReviewStatus({ id, status }) {
  await requireAdmin();

  const review = await prisma.review.update({
    where: { id },
    data: { status },
  });

  return { success: true, review };
}

export async function deleteReview(id) {
  await requireAdmin();

  await prisma.review.delete({ where: { id } });

  return { success: true };
}
