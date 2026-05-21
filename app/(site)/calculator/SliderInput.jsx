"use client";

export default function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  icon: Icon,
}) {
  return (
    <div className="bg-white rounded-xl p-5 border border-ink/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={18} className="text-accent" />
          <span className="font-semibold text-ink text-sm">{label}</span>
        </div>
        <span className="text-2xl font-heading font-semibold text-accent">
          {value.toLocaleString()}
          <span className="text-sm text-ink-mid ml-1">{unit}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-ink/10 rounded-full appearance-none cursor-pointer accent-accent"
      />
      <div className="flex justify-between text-xs text-ink-light mt-1">
        <span>{min.toLocaleString()}</span>
        <span>{max.toLocaleString()}</span>
      </div>
    </div>
  );
}
