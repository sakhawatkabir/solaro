"use client";

import { Suspense } from "react";
import ActivateForm from "./ActivateForm";

export default function ActivatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ActivateForm />
    </Suspense>
  );
}
