"use client";

import { CheckCircle, Sun, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuccessState({ message }) {
  return (
    <>
      <div className="flex items-center justify-center size-16 rounded-full bg-green-100 mx-auto mb-6">
        <CheckCircle size={32} className="text-green-500" />
      </div>
      <div className="flex items-center justify-center gap-2 text-green-600 font-semibold text-sm tracking-widest uppercase mb-4">
        <Sun size={16} />
        Verified
      </div>
      <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
        Email <span className="text-green-500 italic">verified</span>
      </h1>
      <p className="text-ink-mid text-lg mb-8">{message}</p>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 py-4 px-8 bg-accent hover:bg-accent-mid text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20"
      >
        Sign In Now
        <ArrowRight size={18} />
      </Link>
    </>
  );
}
