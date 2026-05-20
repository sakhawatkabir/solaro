"use client";

export default function SavingsTab({ savings }) {
  if (!savings) {
    return (
      <div className="text-center py-8 text-ink-mid">
        No savings information available.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-accent/5 rounded-xl p-6 text-center border border-accent/10">
          <div className="text-3xl font-bold text-accent mb-2">
            ৳{savings.monthly.toLocaleString()}
          </div>
          <div className="text-ink-mid">Monthly Savings</div>
          <div className="text-xs text-ink-light mt-1">
            Based on average BD electricity rates
          </div>
        </div>
        <div className="bg-accent/5 rounded-xl p-6 text-center border border-accent/10">
          <div className="text-3xl font-bold text-accent mb-2">
            ৳{savings.yearly.toLocaleString()}
          </div>
          <div className="text-ink-mid">Yearly Savings</div>
          <div className="text-xs text-ink-light mt-1">
            Compounds over 25 years
          </div>
        </div>
        <div className="bg-accent/5 rounded-xl p-6 text-center border border-accent/10">
          <div className="text-3xl font-bold text-accent mb-2">
            {savings.payback}
          </div>
          <div className="text-ink-mid">Payback Period</div>
          <div className="text-xs text-ink-light mt-1">
            Then pure savings for 20+ years
          </div>
        </div>
      </div>

      <div className="bg-cream rounded-xl p-6 border border-ink/5">
        <h4 className="font-semibold text-ink mb-4">
          25-Year Savings Projection
        </h4>
        <div className="space-y-3">
          {[5, 10, 15, 20, 25].map((year) => (
            <div key={year} className="flex items-center justify-between">
              <span className="text-ink-mid">{year} years</span>
              <div className="flex items-center gap-4 flex-1 mx-4">
                <div
                  className="h-3 bg-accent rounded-full transition-all"
                  style={{ width: `${(year / 25) * 100}%` }}
                />
              </div>
              <span className="font-semibold text-accent">
                ৳{(savings.yearly * year).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
