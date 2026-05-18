export default function EnergyBalanceCard() {
  return (
    <div className="bg-white rounded-3xl p-8 border border-ink/5 relative overflow-hidden">
      <h3 className="text-2xl font-heading font-semibold mb-12 text-ink">
        Total Energy
        <br />
        Balance
      </h3>

      <div className="relative flex items-center justify-center mb-8">
        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            className="stroke-ink-faint"
            strokeWidth="12"
          />

          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#16A34A"
            strokeWidth="12"
            strokeDasharray="502"
            strokeDashoffset="125"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-ink">2.9kwh</div>
          </div>
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-ink">5.6kwh</div>
            <div className="text-xs text-ink-mid">Produced</div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
          <div className="text-left">
            <div className="text-2xl font-bold text-ink">2.3kwh</div>
            <div className="text-xs text-ink-mid">Consumed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
