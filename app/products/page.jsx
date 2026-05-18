"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Filter, Search, ChevronRight, Star } from "lucide-react";
import { products, formatPrice } from "../../data/products";
import { useCart } from "../../context/CartContext";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import CartDrawer from "../../components/CartDrawer";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "all", label: "All Products" },
  { id: "home-kit", label: "Home Kits" },
  { id: "panel", label: "Solar Panels" },
  { id: "battery", label: "Batteries" },
  { id: "inverter", label: "Inverters" },
];

export default function ProductsPage() {
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedId, setAddedId] = useState(null);

  const filtered = products.filter((p) => {
    const matchesCategory =
      activeCategory === "all" || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-cream font-body">
      <Navigation />
      <CartDrawer />

      {/* Header */}
      <section className="pt-32 pb-16 px-8 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              Shop Solar Systems
            </div>
            <h1 className="text-5xl lg:text-6xl font-heading font-bold text-ink leading-tight mb-6">
              Complete solar systems{" "}
              <span className="text-accent italic">for every home</span>
            </h1>
            <p className="text-ink-mid text-lg max-w-2xl leading-relaxed">
              From 1KW starter kits to 10KW premium systems — find the perfect
              solar solution for your home. All prices include free delivery and
              installation across Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="px-8 lg:px-16 pb-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat.id
                      ? "bg-accent text-white shadow-lg shadow-accent/20"
                      : "bg-white text-ink hover:bg-black/5 border border-ink/10"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-light"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-ink/10 rounded-full text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="px-8 lg:px-16 pb-32">
        <div className="max-w-[1400px] mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={48} className="text-ink-faint mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-ink mb-2">
                No products found
              </h3>
              <p className="text-ink-mid">
                Try adjusting your search or category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-ink/5 group hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  {/* Image */}
                  <Link href={`/products/${product.id}`}>
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream cursor-pointer">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {product.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-white text-xs font-bold rounded-full">
                          {product.badge}
                        </span>
                      )}
                      {product.originalPrice > product.price && (
                        <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          Save{" "}
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-ink-light uppercase tracking-wider mb-2">
                      {categories.find((c) => c.id === product.category)
                        ?.label || product.category}
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-heading text-xl font-bold text-ink mb-1 cursor-pointer hover:text-accent transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-ink-mid text-sm mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-ink-mid text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Specs preview */}
                    {product.savings && (
                      <div className="flex items-center gap-2 text-sm text-accent mb-4 bg-accent/5 px-3 py-2 rounded-lg">
                        <Star size={14} fill="currentColor" />
                        <span className="font-semibold">
                          Save ৳{product.savings.monthly.toLocaleString()}/month
                        </span>
                      </div>
                    )}

                    {/* Price & CTA */}
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-ink/5">
                      <div>
                        <div className="text-2xl font-heading font-bold text-accent">
                          {formatPrice(product.price)}
                        </div>
                        {product.originalPrice > product.price && (
                          <div className="text-sm text-ink-light line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/products/${product.id}`}>
                          <span className="px-4 py-2.5 bg-transparent text-ink border border-ink/20 hover:bg-ink hover:text-white rounded-full text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1">
                            Details
                            <ChevronRight size={14} />
                          </span>
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                            addedId === product.id
                              ? "bg-green-500 text-white"
                              : "bg-accent hover:bg-accent-mid text-white"
                          }`}
                        >
                          <ShoppingCart size={16} />
                          {addedId === product.id ? "Added!" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
