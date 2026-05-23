"use client";

import { m } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Shield,
  Truck,
  Phone,
  CheckCircle,
  Share2,
  Heart,
  Calculator,
} from "lucide-react";
import { useState } from "react";
import { formatPrice } from "@/app/data/products";
import { useCart } from "@/app/store/cart";

function getCategoryLabel(category) {
  const labels = {
    HOME_KIT: "Complete Home Kit",
    PANEL: "Solar Panel",
    BATTERY: "Battery Storage",
    INVERTER: "Inverter",
    ACCESSORY: "Accessory",
  };
  return labels[category] || category;
}

export default function ProductInfo({ product, reviewStats }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  const avgRating = reviewStats?.stats?.avgRating || 0;
  const totalReviews = reviewStats?.stats?.totalReviews || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <m.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col"
    >
      <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
        {getCategoryLabel(product.category)}
      </div>

      <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink leading-tight mb-4">
        {product.name}
      </h1>

      {product.description && (
        <div
          className="text-ink-mid text-lg leading-relaxed mb-6 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      )}

      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={18}
              fill={star <= Math.round(avgRating) ? "#FBBF24" : "none"}
              className={
                star <= Math.round(avgRating)
                  ? "text-yellow-400"
                  : "text-ink/20"
              }
            />
          ))}
        </div>
        <a
          href="#reviews-section"
          className="text-ink-mid text-sm hover:text-accent transition-colors"
        >
          {totalReviews > 0
            ? `${avgRating.toFixed(1)} (${totalReviews} review${totalReviews > 1 ? "s" : ""})`
            : "No reviews yet"}
        </a>
      </div>

      <div className="bg-white rounded-xl p-6 mb-6 border border-ink/5">
        <div className="flex items-end gap-4 mb-2">
          <span className="text-4xl font-heading font-semibold text-accent">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xl text-ink-light line-through mb-1">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        <p className="text-sm text-ink-mid">
          Free delivery & installation across all 64 districts of Bangladesh
        </p>
      </div>

      {product.savings && (
        <div className="bg-accent/10 rounded-xl p-5 mb-6 border border-accent/20">
          <div className="flex items-center gap-2 mb-3">
            <Calculator size={20} className="text-accent" />
            <span className="font-semibold text-accent">Estimated Savings</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-2xl font-bold text-accent">
                ৳{product.savings.monthly.toLocaleString()}
              </div>
              <div className="text-xs text-ink-mid">Per Month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                ৳{product.savings.yearly.toLocaleString()}
              </div>
              <div className="text-xs text-ink-mid">Per Year</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent">
                {product.savings.payback}
              </div>
              <div className="text-xs text-ink-mid">Payback</div>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 mb-6">
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-3 ${
            added
              ? "bg-green-500 text-white"
              : "bg-accent hover:bg-accent-mid text-white shadow-lg shadow-accent/20"
          }`}
        >
          <ShoppingCart size={20} />
          {added ? "Added to Cart!" : "Add to Cart"}
        </button>
        <button
          onClick={() => setSaved(!saved)}
          className={`px-5 py-4 rounded-full border-2 transition-all ${
            saved
              ? "border-red-400 bg-red-50 text-red-500"
              : "border-ink/20 text-ink hover:border-accent hover:text-accent"
          }`}
        >
          <Heart size={20} fill={saved ? "currentColor" : "none"} />
        </button>
        <button className="px-5 py-4 rounded-full border-2 border-ink/20 text-ink hover:border-accent hover:text-accent transition-all">
          <Share2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TrustBadge
          icon={Truck}
          title="Free Delivery"
          desc="All 64 districts"
        />
        <TrustBadge
          icon={Shield}
          title="25 Year Warranty"
          desc="Panel performance"
        />
        <TrustBadge
          icon={Phone}
          title="24/7 Support"
          desc="Dedicated hotline"
        />
        <TrustBadge
          icon={CheckCircle}
          title="Net Metering"
          desc="Sell excess power"
        />
      </div>
    </m.div>
  );
}

function TrustBadge({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-ink/5">
      <Icon size={20} className="text-accent flex-shrink-0" />
      <div>
        <div className="text-sm font-semibold text-ink">{title}</div>
        <div className="text-xs text-ink-light">{desc}</div>
      </div>
    </div>
  );
}
