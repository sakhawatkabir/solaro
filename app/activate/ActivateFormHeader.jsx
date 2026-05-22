import { Sun } from "lucide-react";

export default function ActivateFormHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center size-12 rounded-xl bg-emerald-500/10 mb-4">
        <Sun className="size-6 text-emerald-400" />
      </div>
      <h1 className="text-2xl font-semibold text-white">
        Activate Your Account
      </h1>
      <p className="text-zinc-400 mt-2">Set a password to get started</p>
    </div>
  );
}
