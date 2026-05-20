import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfYear = new Date(now.getFullYear(), 0, 1);

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
      recentProducts,
      recentLeads,
      topDistricts,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.customer.count(),
      prisma.lead.count(),
      prisma.district.count({ where: { coverage: true } }),
      prisma.district.count(),
      prisma.product.groupBy({
        by: ["category"],
        _count: true,
      }),
      prisma.lead.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.lead.groupBy({
        by: ["source"],
        _count: true,
      }),
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

    const monthlyStats = await prisma.lead.groupBy({
      by: ["createdAt"],
      _count: true,
      where: {
        createdAt: { gte: startOfMonth },
      },
    });

    const categoryData = productsByCategory.map((item) => ({
      category: item.category,
      count: item._count,
    }));

    const statusData = leadsByStatus.map((item) => ({
      status: item.status,
      count: item._count,
    }));

    const sourceData = leadsBySource.map((item) => ({
      source: item.source,
      count: item._count,
    }));

    const divisionData = districtsByDivision.map((item) => ({
      division: item.division,
      count: item._count,
      population: item._sum.population || 0,
    }));

    return NextResponse.json({
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
      categoryData,
      statusData,
      sourceData,
      divisionData,
      topProducts: recentProducts,
      recentLeads,
      topDistricts,
      monthlyLeads: monthlyStats.length,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
