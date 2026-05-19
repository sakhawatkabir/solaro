"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function ProductBreadcrumb({ title }) {
  return (
    <section className="pt-28 pb-4 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <nav className="flex items-center gap-2 text-sm text-ink-light">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/products" className="hover:text-accent transition-colors">
            Products
          </Link>
          <ChevronRight size={14} />
          <span className="text-ink font-medium">{title}</span>
        </nav>
      </div>
    </section>
  );
}
