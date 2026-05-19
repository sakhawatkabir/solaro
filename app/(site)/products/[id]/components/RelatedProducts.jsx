"use client";

import { m } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/app/data/products";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export default function RelatedProducts({ products }) {
  const prefersReducedMotion = useReducedMotion();

  if (!products || products.length === 0) return null;

  return (
    <section className="px-8 lg:px-16 pb-20">
      <div className="max-w-[1400px] mx-auto">
        <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-ink mb-8">
          You May Also Like
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((related) => (
            <Link
              key={related.id}
              href={`/products/${related.id}`}
              className="group"
            >
              <m.div
                whileHover={prefersReducedMotion ? {} : { y: -5 }}
                className="bg-white rounded-2xl overflow-hidden border border-ink/5 hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={related.image}
                    alt={related.title}
                    width={600}
                    height={450}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {related.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                      {related.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h4 className="font-heading font-semibold text-ink mb-1 group-hover:text-accent transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-ink-mid text-sm mb-3">{related.subtitle}</p>
                  <div className="text-xl font-heading font-semibold text-accent">
                    {formatPrice(related.price)}
                  </div>
                </div>
              </m.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
