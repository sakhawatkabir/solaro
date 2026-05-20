"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductBreadcrumb from "./components/ProductBreadcrumb";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import ProductSuitableFor from "./components/ProductSuitableFor";
import ProductDescription from "./components/ProductDescription";
import RelatedProducts from "./components/RelatedProducts";
import ProductCTA from "./components/ProductCTA";
import ProductReviews from "./components/ProductReviews";

export default function ProductDetailPage({ params }) {
  const [selectedSystem, setSelectedSystem] = useState(null);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const res = await fetch(`/api/products/${params.id}`);
      const data = await res.json();
      if (!data.product) throw new Error("Product not found");
      return data.product;
    },
  });

  const { data: relatedProducts = [] } = useQuery({
    queryKey: ["related-products", product?.category],
    queryFn: async () => {
      const res = await fetch(
        `/api/products?category=${product.category}&status=ACTIVE`,
      );
      const data = await res.json();
      return (data.products || [])
        .filter((p) => p.id !== product.id)
        .slice(0, 3);
    },
    enabled: !!product?.category,
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-[4/3] bg-zinc-100 rounded-2xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 w-20 bg-zinc-200 rounded animate-pulse" />
              <div className="h-8 w-3/4 bg-zinc-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-zinc-200 rounded animate-pulse" />
              <div className="h-10 w-40 bg-zinc-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-zinc-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-8 text-center">
        <h1 className="text-4xl font-heading font-semibold text-ink mb-4">
          Product Not Found
        </h1>
        <p className="text-ink-mid mb-8">
          The product you are looking for does not exist or is no longer
          available.
        </p>
        <a
          href="/products"
          className="px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-block"
        >
          Browse All Products
        </a>
      </div>
    );
  }

  return (
    <>
      <ProductBreadcrumb title={product.name} />

      <section className="px-8 lg:px-16 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ProductGallery product={product} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <section className="px-8 lg:px-16 pb-20">
        <ProductTabs product={product} />
      </section>

      {product.suitableFor && (
        <ProductSuitableFor items={product.suitableFor} />
      )}

      <ProductDescription description={product.description} />

      <RelatedProducts products={relatedProducts} />

      <ProductReviews productId={product.id} />

      <ProductCTA />
    </>
  );
}
