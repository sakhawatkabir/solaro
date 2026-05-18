"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-ink/10 pt-24 pb-12 px-8 lg:px-16 font-body">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <div className="w-6 h-6 rounded-full bg-primary"></div>
              <span className="text-2xl font-heading font-bold text-ink tracking-tight">
                Solaro.
              </span>
            </div>
            <p className="text-ink-mid text-sm leading-relaxed max-w-xs">
              Transitioning to clean, renewable energy. Lock in your energy
              rates and increase your home's value instantly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-ink font-heading font-bold text-lg mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#panels"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  Solar Panels
                </a>
              </li>
              <li>
                <a
                  href="#kits"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  Home Kits
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  Customer Reviews
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-ink font-heading font-bold text-lg mb-6">
              Contact
            </h3>
            <div className="space-y-4 text-ink-mid">
              <p>
                45 Greenfield Street,
                <br />
                Dhaka, Bangladesh
              </p>
              <p>+880 17 0000 0000</p>
              <p>zipsoft.contact@gmail.com</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-ink font-heading font-bold text-lg mb-6">
              Social
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-ink-mid hover:text-ink transition-colors"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-ink/10 text-ink-mid text-sm">
          <p>© {currentYear} Solaro Energy. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-ink transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-ink transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
