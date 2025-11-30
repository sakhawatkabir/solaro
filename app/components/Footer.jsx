"use client";

import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 opacity-10">
        <svg
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="200" cy="100" r="150" stroke="black" strokeWidth="2" />
          <circle cx="200" cy="100" r="180" stroke="black" strokeWidth="2" />
          <circle cx="200" cy="100" r="210" stroke="black" strokeWidth="2" />
          <path
            d="M50 100 Q100 50, 150 100 T250 100 T350 100"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50 130 Q100 80, 150 130 T250 130 T350 130"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M50 160 Q100 110, 150 160 T250 160 T350 160"
            stroke="black"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="container mx-auto px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-black font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  How It Works
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-black font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-2 text-gray-800">
              <p>45 Greenfield Street,</p>
              <p>Dhaka, Bangladesh</p>
              <p className="pt-2">Mobile : +880 17</p>
              <p>Gmail: zipsoft.contact@gmail.com</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-black font-semibold text-lg mb-4">
              Office Hours
            </h3>
            <div className="space-y-2 text-gray-800">
              <p>Mon - Fri: 9:00 AM - 6:00 PM</p>
              <p>Sat - Sun: Closed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-black font-semibold text-lg mb-4">
              Social Media
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-black transition-colors"
                >
                  Dribbble
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-7xl lg:text-8xl xl:text-9xl font-heading font-bold text-black tracking-tight">
            SOLARO
          </h2>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-black/10">
          <p className="text-gray-800 text-sm">
            © {currentYear} solaro Energy. All rights reserved.
          </p>
          <a
            href="#"
            className="text-gray-800 hover:text-black text-sm transition-colors"
          >
            Privacy & Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
