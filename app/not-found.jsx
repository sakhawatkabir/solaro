"use client";

import { motion } from "framer-motion";
import { Sun, ArrowLeft, Home, Search } from "lucide-react";
import Link from "next/link";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream font-body">
      <Navigation />

      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Sun Icon */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sun size={128} className="text-accent/20 w-full h-full" />
              </motion.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-heading font-bold text-accent">
                  404
                </span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-ink mb-4">
              Page Not Found
            </h1>
            <p className="text-ink-mid text-lg mb-8 leading-relaxed">
              Looks like this page is in the shadows. The page you are looking
              for might have been removed, renamed, or does not exist.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <span className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-flex items-center gap-2">
                  <Home size={18} />
                  Go Home
                </span>
              </Link>
              <Link href="/products">
                <span className="px-8 py-4 bg-white text-ink border border-ink/20 rounded-full font-semibold hover:border-accent hover:text-accent transition-colors inline-flex items-center gap-2">
                  <Search size={18} />
                  Browse Products
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Helpful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 bg-white rounded-2xl p-8 border border-ink/5"
          >
            <h3 className="font-heading font-bold text-ink mb-4">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link
                href="/products"
                className="p-4 rounded-xl bg-cream/50 hover:bg-accent/5 transition-colors text-left"
              >
                <div className="font-semibold text-ink">Solar Products</div>
                <div className="text-sm text-ink-light">
                  Home kits, panels, batteries
                </div>
              </Link>
              <Link
                href="/services"
                className="p-4 rounded-xl bg-cream/50 hover:bg-accent/5 transition-colors text-left"
              >
                <div className="font-semibold text-ink">Our Services</div>
                <div className="text-sm text-ink-light">
                  Installation & maintenance
                </div>
              </Link>
              <Link
                href="/about"
                className="p-4 rounded-xl bg-cream/50 hover:bg-accent/5 transition-colors text-left"
              >
                <div className="font-semibold text-ink">About SOLARO</div>
                <div className="text-sm text-ink-light">
                  Our story & mission
                </div>
              </Link>
              <Link
                href="/contact"
                className="p-4 rounded-xl bg-cream/50 hover:bg-accent/5 transition-colors text-left"
              >
                <div className="font-semibold text-ink">Contact Us</div>
                <div className="text-sm text-ink-light">
                  Get in touch with our team
                </div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
