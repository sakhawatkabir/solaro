"use client";

import { useEffect } from "react";
import { products, getProductById } from "@/app/data/products";
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
  const product = getProductById(params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-8 text-center">
        <h1 className="text-4xl font-heading font-semibold text-ink mb-4">
          Product Not Found
        </h1>
        <p className="text-ink-mid mb-8">
          The product you are looking for does not exist.
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

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <ProductBreadcrumb title={product.title} />

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

      <ProductSuitableFor items={product.suitableFor} />

      <ProductDescription description={product.description} />

      <RelatedProducts products={relatedProducts} />

      <ProductReviews productId={product.id} />

      <ProductCTA />
    </>
  );
}
