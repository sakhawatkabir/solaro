"use client";

import { Suspense } from "react";
import TwoFactorForm from "./TwoFactorForm";

export default function TwoFactorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <TwoFactorForm />
    </Suspense>
  );
}
