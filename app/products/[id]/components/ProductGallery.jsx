"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop",
  ];

  return (
    <m.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4">
        <Image
          src={images[selectedImage]}
          alt={product.title}
          width={1200}
          height={900}
          className="w-full h-full object-cover"
        />
        {product.badge && (
          <span className="absolute top-4 left-4 px-4 py-1.5 bg-accent text-white text-sm font-bold rounded-full">
            {product.badge}
          </span>
        )}
        {product.originalPrice > product.price && (
          <span className="absolute top-4 right-4 px-4 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
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

      <div className="flex gap-3">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => setSelectedImage(idx)}
            className={`size-24 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImage === idx
                ? "border-accent shadow-md"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`${product.title} view ${idx + 1}`}
              width={96}
              height={80}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </m.div>
  );
}
