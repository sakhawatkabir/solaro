"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/app/actions/server-auth";

export async function getActiveProducts(category = "") {
  try {
    const where = { status: "ACTIVE" };

    if (category && category !== "all") {
      where.category = category;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return products;
  } catch (error) {
    console.error("Get active products error:", error);
    return [];
  }
}

export async function getFeaturedProducts(count = 6) {
  try {
    const products = await prisma.product.findMany({
      where: { status: "ACTIVE", category: "HOME_KIT" },
      orderBy: [{ createdAt: "desc" }],
      take: count,
    });

    return { success: true, products };
  } catch (error) {
    console.error("Get featured products error:", error);
    return { success: false, products: [] };
  }
}

export async function getProducts(
  page = 1,
  limit = 20,
  search = "",
  category = "",
  status = "",
) {
  await requireAdmin();
  try {
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

    return {
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (error) {
    console.error("Get products error:", error);
    throw new Error("Failed to fetch products");
  }
}

export async function getProductsSummary() {
  await requireAdmin();
  try {
    const allProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return {
      totalStock: allProducts.reduce((sum, p) => sum + p.stock, 0),
      totalSales: allProducts.reduce((sum, p) => sum + p.sales, 0),
      allProducts,
    };
  } catch (error) {
    console.error("Get products summary error:", error);
    throw new Error("Failed to fetch products summary");
  }
}

export async function getProduct(id) {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    return product;
  } catch (error) {
    console.error("Get product error:", error);
    return null;
  }
}

export async function createProduct(data) {
  await requireAdmin();
  try {
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
    } = data;

    if (!name || !category || !price) {
      throw new Error("Name, category, and price are required");
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
        specs: specs
          ? typeof specs === "string"
            ? JSON.parse(specs)
            : specs
          : null,
      },
    });

    revalidatePath("/admin/products");
    return { success: true, product };
  } catch (error) {
    console.error("Create product error:", error);
    if (error.code === "P2002") {
      throw new Error("A product with this name already exists");
    }
    throw new Error("Failed to create product");
  }
}

export async function updateProduct(id, data) {
  await requireAdmin();
  try {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error("Product not found");

    const updateData = {};

    if (data.name !== undefined) {
      updateData.name = data.name;
      updateData.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }
    if (data.category !== undefined) updateData.category = data.category;
    if (data.price !== undefined) updateData.price = parseInt(data.price);
    if (data.originalPrice !== undefined)
      updateData.originalPrice = data.originalPrice
        ? parseInt(data.originalPrice)
        : null;
    if (data.stock !== undefined) updateData.stock = parseInt(data.stock);
    if (data.status !== undefined) updateData.status = data.status;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.badge !== undefined) updateData.badge = data.badge;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.images !== undefined) updateData.images = data.images;
    if (data.specs !== undefined)
      updateData.specs =
        typeof data.specs === "string" ? JSON.parse(data.specs) : data.specs;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    return { success: true, product };
  } catch (error) {
    console.error("Update product error:", error);
    if (error.code === "P2002") {
      throw new Error("A product with this name already exists");
    }
    throw new Error("Failed to update product");
  }
}

export async function deleteProduct(id) {
  await requireAdmin();
  try {
    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing) throw new Error("Product not found");

    await prisma.product.delete({ where: { id } });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Delete product error:", error);
    throw new Error("Failed to delete product");
  }
}
