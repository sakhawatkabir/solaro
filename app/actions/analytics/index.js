"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/actions/server-auth";

export async function getAnalytics() {
  await requireAdmin();
  try {
    const [
      totalProducts,
      totalCustomers,
      totalLeads,
      coveredDistricts,
      totalDistricts,
      productsByCategory,
      leadsByStatus,
      leadsBySource,
      districtsByDivision,
      topProducts,
      recentLeads,
      topDistricts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.customer.count(),
      prisma.lead.count(),
      prisma.district.count({ where: { coverage: true } }),
      prisma.district.count(),
      prisma.product.groupBy({ by: ["category"], _count: true }),
      prisma.lead.groupBy({ by: ["status"], _count: true }),
      prisma.lead.groupBy({ by: ["source"], _count: true }),
      prisma.district.groupBy({
        by: ["division"],
        _count: true,
        _sum: { population: true },
      }),
      prisma.product.findMany({
        take: 5,
        orderBy: { sales: "desc" },
        select: { id: true, name: true, sales: true, price: true, image: true },
      }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
          estimatedValue: true,
        },
      }),
      prisma.district.findMany({
        where: { coverage: true },
        take: 5,
        orderBy: { population: "desc" },
        select: { id: true, name: true, division: true, population: true },
      }),
    ]);

    const totalRevenue = await prisma.product.aggregate({
      _sum: { price: true },
      where: { sales: { gt: 0 } },
    });

    return {
      overview: {
        totalProducts,
        totalCustomers,
        totalLeads,
        totalRevenue: totalRevenue._sum.price || 0,
        coveredDistricts,
        totalDistricts,
        coverageRate:
          totalDistricts > 0 ? (coveredDistricts / totalDistricts) * 100 : 0,
      },
      categoryData: productsByCategory.map((item) => ({
        category: item.category,
        count: item._count,
      })),
      statusData: leadsByStatus.map((item) => ({
        status: item.status,
        count: item._count,
      })),
      sourceData: leadsBySource.map((item) => ({
        source: item.source,
        count: item._count,
      })),
      divisionData: districtsByDivision.map((item) => ({
        division: item.division,
        count: item._count,
        population: item._sum.population || 0,
      })),
      topProducts,
      recentLeads,
      topDistricts,
    };
  } catch (error) {
    console.error("Get analytics error:", error);
    throw new Error("Failed to fetch analytics");
  }
}
