"use client";

import { motion } from "framer-motion";
import MembersBadge from "./MembersBadge";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-40"></div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(11,218,81,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(163,230,53,0.06),transparent_50%)]"></div>

      {/* Glowing orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[150px] animate-float"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-[250px] h-[250px] bg-primary/5 rounded-full blur-[80px] animate-float-delayed"></div>
      </div>

      {/* Decorative floating dots */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-2 h-2 bg-primary rounded-full opacity-60"
      />
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] left-[10%] w-1.5 h-1.5 bg-accent rounded-full opacity-40"
      />
      <motion.div
        animate={{ y: [-8, 12, -8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[30%] right-[25%] w-1 h-1 bg-primary rounded-full opacity-50"
      />

      {/* Content */}
      <div className="relative z-10 w-full container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8 inline-block"
            >
              <MembersBadge />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              <span className="text-sm text-primary font-medium">
                #1 Solar Provider in Bangladesh
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            >
              <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
                Solar Power
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                for Every Home
              </span>
              <br />
              <span className="text-white/80 text-4xl md:text-5xl lg:text-6xl">
                in Bangladesh
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0"
            >
              Reduce your electricity bill by up to 80% with premium solar
              panels. Expert installation, government subsidy support, and
              after-sales service across Bangladesh.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-primary hover:bg-primary/90 text-black font-semibold rounded-full transition-all shadow-lg shadow-primary/30 overflow-hidden"
              >
                <span className="relative z-10">Get Free Quote</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-full font-semibold text-white overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full group-hover:border-primary/30 transition-colors"></div>
                <span className="relative z-10 flex items-center gap-2 justify-center">
                  View Packages
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </motion.button>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 sm:gap-12"
            >
              {[
                { value: "5,000+", label: "Homes Powered" },
                { value: "80%", label: "Bill Savings" },
                { value: "25yr", label: "Panel Warranty" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-8 sm:gap-12">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Panel Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Decorative ring */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full border border-primary/10 animate-spin [animation-duration:30s]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full border border-accent/5 animate-spin [animation-duration:45s] [animation-direction:reverse]"></div>

            {/* Glow behind image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[90%] h-[90%] bg-primary/10 rounded-full blur-[100px]"></div>
            </div>

            {/* Image container with gradient border */}
            <div className="relative z-10 p-[1px] rounded-3xl bg-gradient-to-br from-primary/40 via-transparent to-accent/30">
              <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a]">
                <img
                  src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80"
                  alt="Solar panels on rooftop"
                  className="w-full max-w-lg"
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent"></div>

                {/* Floating badge on image */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      3kW System
                    </div>
                    <div className="text-xs text-gray-400">
                      Powers your entire home
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 border-primary/20 rounded-br-3xl"></div>
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 border-accent/15 rounded-tl-3xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
