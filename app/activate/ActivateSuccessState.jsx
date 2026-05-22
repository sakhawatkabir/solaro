import { CheckCircle } from "lucide-react";

export default function ActivateSuccessState() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="size-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="size-8 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-semibold text-white mb-2">
          Account Activated!
        </h1>
        <p className="text-zinc-400">Redirecting to login…</p>
      </div>
    </div>
  );
}
