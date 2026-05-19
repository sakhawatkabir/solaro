"use client";

import { m } from "framer-motion";
import { Sun, Home, Search } from "lucide-react";
import Link from "next/link";
import { useReducedMotion } from "./hooks/useReducedMotion";

export default function NotFound() {
  const prefersReducedMotion = useReducedMotion();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  return (
    <>
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: transitionDuration }}
          >
            {/* Sun Icon */}
            <div className="relative size-32 mx-auto mb-8">
              <m.div
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={
                  prefersReducedMotion
                    ? {}
                    : { duration: 20, repeat: Infinity, ease: "linear" }
                }
                className="absolute inset-0"
              >
                <Sun size={128} className="text-accent/20 w-full h-full" />
              </m.div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl font-heading font-semibold text-accent">
                  404
                </span>
              </div>
            </div>

            <h1 className="text-4xl lg:text-5xl font-heading font-semibold text-ink mb-4">
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
          </m.div>
        </div>
      </section>
    </>
  );
}
