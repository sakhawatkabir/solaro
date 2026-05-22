"use client";

import { Sun } from "lucide-react";

export default function LoadingState() {
  return (
    <>
      <div className="flex items-center justify-center size-16 rounded-full bg-accent/10 mx-auto mb-6">
        <div className="size-8 border-3 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
      <div className="flex items-center justify-center gap-2 text-accent font-semibold text-sm tracking-widest uppercase mb-4">
        <Sun size={16} />
        Verifying
      </div>
      <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-4">
        Verifying your <span className="text-accent italic">email</span>
      </h1>
      <p className="text-ink-mid text-lg">
        Please wait while we verify your email address…
      </p>
    </>
  );
}
