"use client";

export default function PaymentMethod({
  icon: Icon,
  name,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-800 border border-zinc-700">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
          <Icon className="size-5 text-emerald-400" />
        </div>
        <div>
          <div className="text-sm font-medium text-zinc-200">{name}</div>
          <div className="text-xs text-zinc-500">{description}</div>
        </div>
      </div>
      <button
        onClick={() => onToggle(!enabled)}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? "bg-emerald-500" : "bg-zinc-700"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 size-5 bg-white rounded-full transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
