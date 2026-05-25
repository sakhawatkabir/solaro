"use client";

import { m } from "framer-motion";
import { Star, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "../store/cart";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFeaturedProducts } from "@/app/actions/products";

function formatPrice(price) {
  return `৳${price.toLocaleString("en-BD")}`;
}

export default function FeaturedProducts({ initialData }) {
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState(null);
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["featured-products"] });
  }, [queryClient]);

  const { data } = useQuery({
    queryKey: ["featured-products"],
    queryFn: () => getFeaturedProducts(6),
    initialData: initialData,
  });

  const products = data?.products || [];

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  if (products.length === 0) return null;

  return (
    <section className="py-20 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration }}
          className="text-center mb-12"
        >
          <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
            Featured Products
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
            Complete solar kits for every home
          </h2>
          <p className="text-ink-mid max-w-xl mx-auto">
            From small apartments to large villas — find the perfect solar
            system with free delivery and installation across all 64 districts.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {products.map((product, index) => (
            <m.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-ink/5 group hover:shadow-xl transition-all h-full flex flex-col"
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-cream rounded-t-2xl">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-ink-light">
                      <Star size={48} />
                    </div>
                  )}
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                      {product.badge}
                    </span>
                  )}
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="absolute top-3 right-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                        Save{" "}
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )}
                        %
                      </span>
                    )}
                </div>
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-heading font-semibold text-ink text-lg mb-1 cursor-pointer hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                </Link>
                {product.description && (
                  <div
                    className="text-ink-light text-sm mb-3 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                )}

                {product.savings && (
                  <div className="flex items-center gap-1.5 text-sm text-accent mb-3 bg-accent/5 px-3 py-1.5 rounded-lg">
                    <Star size={14} fill="currentColor" />
                    <span className="font-semibold">
                      Save ৳{product.savings.monthly?.toLocaleString() || 0}
                      /month
                    </span>
                  </div>
                )}

                {product.specs && (
                  <div className="text-xs text-ink-mid mb-4 space-y-1">
                    {product.specs.panels && <div>{product.specs.panels}</div>}
                    {product.specs.battery && (
                      <div>{product.specs.battery}</div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink/5">
                  <div>
                    <div className="text-xl font-heading font-semibold text-accent">
                      {formatPrice(product.price)}
                    </div>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <div className="text-sm text-ink-light line-through">
                          {formatPrice(product.originalPrice)}
                        </div>
                      )}
                  </div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                      addedId === product.id
                        ? "bg-green-500 text-white"
                        : "bg-accent hover:bg-accent-mid text-white"
                    }`}
                  >
                    <ShoppingCart size={14} />
                    {addedId === product.id ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </m.div>
          ))}
        </div>

        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: transitionDuration }}
          className="text-center"
        >
          <Link href="/products">
            <span className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-ink/20 text-ink rounded-full font-semibold hover:border-accent hover:text-accent transition-all">
              View All Products
              <ArrowRight size={18} />
            </span>
          </Link>
        </m.div>
      </div>
    </section>
  );
}
