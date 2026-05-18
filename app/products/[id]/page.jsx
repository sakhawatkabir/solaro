"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Zap,
  Battery,
  Sun,
  Shield,
  Clock,
  Home,
  CheckCircle,
  ChevronRight,
  Share2,
  Heart,
  Truck,
  Phone,
  Calculator,
} from "lucide-react";
import { products, formatPrice, getProductById } from "@/app/data/products";
import { useCart } from "@/app/context/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";

const specIcons = {
  panels: Sun,
  inverter: Zap,
  battery: Battery,
  backupTime: Clock,
  coverage: Home,
  warranty: Shield,
  power: Zap,
  efficiency: Star,
  cells: Sun,
  dimensions: Home,
  weight: Truck,
  capacity: Battery,
  type: Battery,
  cycles: Clock,
  voltage: Zap,
  bms: Shield,
  mppt: Zap,
  input: Zap,
  output: Zap,
};

export default function ProductDetailPage({ params }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState("specs");
  const [saved, setSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(params.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-8 text-center">
        <h1 className="text-4xl font-heading font-bold text-ink mb-4">
          Product Not Found
        </h1>
        <p className="text-ink-mid mb-8">
          The product you are looking for does not exist.
        </p>
        <Link href="/products">
          <span className="px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors">
            Browse All Products
          </span>
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop",
  ];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const tabs = [
    { id: "specs", label: "Specifications" },
    { id: "includes", label: "What is Included" },
    { id: "savings", label: "Savings Breakdown" },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-28 pb-4 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-ink-light">
            <Link href="/" className="hover:text-accent transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link
              href="/products"
              className="hover:text-accent transition-colors"
            >
              Products
            </Link>
            <ChevronRight size={14} />
            <span className="text-ink font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Hero */}
      <section className="px-8 lg:px-16 pb-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.title}
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

              {/* Thumbnails */}
              <div className="flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-24 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-accent shadow-md"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col"
            >
              <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
                {product.category === "home-kit"
                  ? "Complete Home Kit"
                  : product.category === "panel"
                    ? "Solar Panel"
                    : product.category === "battery"
                      ? "Battery Storage"
                      : "Inverter"}
              </div>

              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-ink leading-tight mb-4">
                {product.title}
              </h1>

              <p className="text-ink-mid text-lg leading-relaxed mb-6">
                {product.subtitle}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={18}
                      fill="#16A34A"
                      className="text-accent"
                    />
                  ))}
                </div>
                <span className="text-ink-mid text-sm">4.9 (127 reviews)</span>
              </div>

              {/* Price */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-ink/5">
                <div className="flex items-end gap-4 mb-2">
                  <span className="text-4xl font-heading font-bold text-accent">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xl text-ink-light line-through mb-1">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-mid">
                  Free delivery & installation across all 64 districts of
                  Bangladesh
                </p>
              </div>

              {/* Savings Preview */}
              {product.savings && (
                <div className="bg-accent/10 rounded-xl p-5 mb-6 border border-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Calculator size={20} className="text-accent" />
                    <span className="font-semibold text-accent">
                      Estimated Savings
                    </span>
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

              {/* Action Buttons */}
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

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-ink/5">
                  <Truck size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      Free Delivery
                    </div>
                    <div className="text-xs text-ink-light">
                      All 64 districts
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-ink/5">
                  <Shield size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      25 Year Warranty
                    </div>
                    <div className="text-xs text-ink-light">
                      Panel performance
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-ink/5">
                  <Phone size={20} className="text-accent flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      24/7 Support
                    </div>
                    <div className="text-xs text-ink-light">
                      Dedicated hotline
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white rounded-lg p-4 border border-ink/5">
                  <CheckCircle
                    size={20}
                    className="text-accent flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm font-semibold text-ink">
                      Net Metering
                    </div>
                    <div className="text-xs text-ink-light">
                      Sell excess power
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          {/* Tab Headers */}
          <div className="flex gap-1 border-b border-ink/10 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold text-sm transition-all relative ${
                  activeTab === tab.id
                    ? "text-accent"
                    : "text-ink-light hover:text-ink"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 border border-ink/5"
          >
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => {
                  const Icon = specIcons[key] || Zap;
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-4 p-4 rounded-xl bg-cream/50"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-accent" />
                      </div>
                      <div>
                        <div className="text-xs text-ink-light uppercase tracking-wider mb-1">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-ink font-medium">{value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "includes" && (
              <div className="space-y-4">
                {product.includes.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-xl bg-cream/50"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={18} className="text-accent" />
                    </div>
                    <span className="text-ink">{item}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "savings" && product.savings && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-accent/5 rounded-xl p-6 text-center border border-accent/10">
                    <div className="text-3xl font-bold text-accent mb-2">
                      ৳{product.savings.monthly.toLocaleString()}
                    </div>
                    <div className="text-ink-mid">Monthly Savings</div>
                    <div className="text-xs text-ink-light mt-1">
                      Based on average BD electricity rates
                    </div>
                  </div>
                  <div className="bg-accent/5 rounded-xl p-6 text-center border border-accent/10">
                    <div className="text-3xl font-bold text-accent mb-2">
                      ৳{product.savings.yearly.toLocaleString()}
                    </div>
                    <div className="text-ink-mid">Yearly Savings</div>
                    <div className="text-xs text-ink-light mt-1">
                      Compounds over 25 years
                    </div>
                  </div>
                  <div className="bg-accent/5 rounded-xl p-6 text-center border border-accent/10">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {product.savings.payback}
                    </div>
                    <div className="text-ink-mid">Payback Period</div>
                    <div className="text-xs text-ink-light mt-1">
                      Then pure savings for 20+ years
                    </div>
                  </div>
                </div>

                <div className="bg-cream rounded-xl p-6 border border-ink/5">
                  <h4 className="font-semibold text-ink mb-4">
                    25-Year Savings Projection
                  </h4>
                  <div className="space-y-3">
                    {[5, 10, 15, 20, 25].map((year) => (
                      <div
                        key={year}
                        className="flex items-center justify-between"
                      >
                        <span className="text-ink-mid">{year} years</span>
                        <div className="flex items-center gap-4 flex-1 mx-4">
                          <div
                            className="h-3 bg-accent rounded-full transition-all"
                            style={{
                              width: `${(year / 25) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="font-semibold text-accent">
                          ৳{(product.savings.yearly * year).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Suitable For */}
      {product.suitableFor && (
        <section className="px-8 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <div className="bg-gradient-to-br from-accent to-accent-mid rounded-2xl p-8 lg:p-12 text-white">
              <h3 className="text-2xl lg:text-3xl font-heading font-bold mb-6">
                Perfect For
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.suitableFor.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-white/10 rounded-xl p-4 backdrop-blur-sm"
                  >
                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Description */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-ink/5">
            <h3 className="text-2xl font-heading font-bold text-ink mb-4">
              About This Product
            </h3>
            <p className="text-ink-mid leading-relaxed text-lg">
              {product.description}
            </p>
            <div className="mt-6 p-4 bg-cream rounded-xl border border-ink/5">
              <p className="text-sm text-ink-mid">
                <strong className="text-ink">Bangladesh Ready:</strong> All our
                systems are optimized for Bangladesh climate conditions —
                monsoon resistant, humidity protected, and designed for the
                tropical sun. We handle DESA/DESCO net metering paperwork so you
                can sell excess power back to the grid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="px-8 lg:px-16 pb-20">
          <div className="max-w-[1400px] mx-auto">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-ink mb-8">
              You May Also Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="group"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-2xl overflow-hidden border border-ink/5 hover:shadow-xl transition-shadow"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {related.badge && (
                        <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                          {related.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-5">
                      <h4 className="font-heading font-bold text-ink mb-1 group-hover:text-accent transition-colors">
                        {related.title}
                      </h4>
                      <p className="text-ink-mid text-sm mb-3">
                        {related.subtitle}
                      </p>
                      <div className="text-xl font-heading font-bold text-accent">
                        {formatPrice(related.price)}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="px-8 lg:px-16 pb-20">
        <div className="max-w-[1400px] mx-auto">
          <div className="bg-ink rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl lg:text-4xl font-heading font-bold text-white mb-4">
              Need Help Choosing the Right System?
            </h3>
            <p className="text-ink-faint text-lg mb-8 max-w-2xl mx-auto">
              Our solar experts will assess your home, calculate your energy
              needs, and recommend the perfect system. Free consultation, no
              obligation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <span className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-block">
                  Get Free Consultation
                </span>
              </Link>
              <a
                href="tel:+8801XXXXXXXXX"
                className="px-8 py-4 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone size={18} />
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
