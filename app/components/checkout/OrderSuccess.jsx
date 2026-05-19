"use client";

import { motion } from "framer-motion";
import { CheckCircle, Package } from "lucide-react";
import Link from "next/link";

export default function OrderSuccess({ orderId }) {
  return (
    <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 lg:p-12 border border-ink/5 text-center"
        >
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-accent" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-heading font-bold text-ink mb-4">
            Order Confirmed!
          </h1>
          <p className="text-ink-mid text-lg mb-8">
            Thank you for choosing SOLARO. Our team will contact you within 24
            hours to schedule delivery and installation.
          </p>

          <div className="bg-cream rounded-xl p-6 mb-8 text-left">
            <div className="flex items-center gap-2 mb-4">
              <Package size={18} className="text-accent" />
              <span className="font-semibold text-ink">Order Details</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-mid">Order ID</span>
                <span className="font-mono font-semibold text-ink">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-mid">Estimated Delivery</span>
                <span className="font-semibold text-ink">
                  3-5 business days
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            <Link href="/products">
              <span className="block w-full py-4 bg-accent hover:bg-accent-mid text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20">
                Continue Shopping
              </span>
            </Link>
            <Link href="/contact">
              <span className="block w-full py-4 bg-transparent text-ink border border-ink/20 rounded-full font-semibold hover:bg-ink/5 transition-colors">
                Need Help? Contact Us
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
