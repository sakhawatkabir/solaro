"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Badge from "../components/Badge";

export default function ServicesPage() {
  const services = [
    {
      title: "Residential Solar Installation",
      description:
        "Custom solar panel systems designed for homes of all sizes. We handle everything from consultation to installation and maintenance.",
      features: [
        "Free home energy assessment",
        "Custom system design",
        "Professional installation",
        "Warranty and support",
        "Financing options available",
      ],
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    {
      title: "Commercial Solar Solutions",
      description:
        "Large-scale solar installations for businesses, warehouses, and commercial properties. Reduce operational costs and boost your sustainability profile.",
      features: [
        "Commercial-grade equipment",
        "Scalable solutions",
        "ROI analysis and planning",
        "Minimal business disruption",
        "Tax incentive assistance",
      ],
      image:
        "https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    {
      title: "Solar Panel Maintenance",
      description:
        "Keep your solar panels operating at peak efficiency with our professional cleaning and maintenance services.",
      features: [
        "Regular cleaning and inspection",
        "Performance monitoring",
        "Panel repair and replacement",
        "System optimization",
        "Annual maintenance plans",
      ],
      image:
        "https://images.unsplash.com/photo-1566821594226-cdc9cb42a4c8?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    {
      title: "Energy Storage Systems",
      description:
        "Battery backup solutions to store excess solar energy for use during peak hours or power outages.",
      features: [
        "Tesla Powerwall installation",
        "Backup power solutions",
        "Grid independence options",
        "Smart energy management",
        "Emergency power supply",
      ],
      image:
        "https://images.unsplash.com/photo-1705579605238-24a90c8799c5?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    {
      title: "Solar Consultation",
      description:
        "Expert advice on solar feasibility, system design, and return on investment calculations for your property.",
      features: [
        "Site assessment",
        "Energy usage analysis",
        "ROI calculations",
        "Incentive guidance",
        "Custom recommendations",
      ],
      image:
        "https://images.unsplash.com/photo-1705579604902-eb832f58bf85?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
    {
      title: "Solar Monitoring & Support",
      description:
        "24/7 system monitoring and technical support to ensure your solar installation performs optimally year-round.",
      features: [
        "Real-time monitoring",
        "24/7 technical support",
        "Performance alerts",
        "Remote diagnostics",
        "Lifetime support",
      ],
      image:
        "https://images.unsplash.com/photo-1630672607721-48e0a0187a92?crop=entropy&cs=srgb&fm=jpg&q=85&w=800",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navigation />

      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-32 px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=1920"
            alt="Solar services background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="inline-flex mb-6">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              OUR SERVICES
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl lg:text-6xl font-heading font-bold mb-6"
          >
            Complete Solar <span className="text-primary">Solutions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-gray-300 leading-relaxed"
          >
            From consultation to installation and ongoing support, we provide
            comprehensive solar energy services tailored to your needs.
          </motion.p>
        </div>
      </section>

      <section className="py-20 px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="text-3xl lg:text-4xl font-heading font-bold text-black dark:text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 px-8 py-4 bg-primary hover:bg-primary/90 text-black dark:text-black font-semibold rounded-full transition-all shadow-lg shadow-primary/20"
                  >
                    Learn More
                  </motion.button>
                </div>

                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-3xl overflow-hidden shadow-xl">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-black dark:text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Contact us today for a free consultation and discover how solar
              energy can transform your property.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-primary hover:bg-primary/90 text-black dark:text-black font-semibold rounded-full transition-all shadow-lg shadow-primary/20 text-lg"
            >
              Get Free Quote
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
