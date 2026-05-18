"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const products = [
    {
      title: "Monocrystalline Panels",
      price: "From ৳28,000",
      description:
        "High-efficiency 400W premium solar panels. Perfect for Bangladeshi homes with limited roof space. Tier-1 grade.",
      image:
        "https://images.unsplash.com/photo-1592833159155-c62df1b65634?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Complete Home Kits",
      price: "From ৳1,85,000",
      description:
        "Everything you need to power your home — panels, hybrid inverter, batteries, mounting hardware, and wiring. Installation included.",
      image:
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Lithium Battery Storage",
      price: "From ৳95,000",
      description:
        "Store excess energy for nighttime use or during load shedding. Powers fans, lights, and routers for 8+ hours.",
      image:
        "https://images.unsplash.com/photo-1705579605238-24a90c8799c5?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section
      className="bg-white py-32 px-8 lg:px-16 border-t border-ink/5"
      id="products"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <div className="text-accent font-semibold text-sm tracking-widest uppercase mb-6">
            Featured Products
          </div>
          <h2 className="text-5xl lg:text-6xl font-heading font-bold text-ink leading-tight">
            Power your home with{" "}
            <span className="text-accent italic">Bangladesh's sun</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col group cursor-pointer"
            >
              <div className="overflow-hidden rounded mb-8 aspect-[4/3] bg-cream">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-heading text-2xl font-bold text-ink">
                  {product.title}
                </h3>
              </div>
              <div className="text-accent font-semibold font-body mb-4">
                {product.price}
              </div>
              <p className="font-body text-ink-mid leading-relaxed text-base mb-6">
                {product.description}
              </p>
              <button className="mt-auto px-6 py-3 border border-ink hover:bg-ink hover:text-white transition-colors font-body font-semibold rounded">
                Add to Cart
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
