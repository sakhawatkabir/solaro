"use client";

export default function SavingsStats({
  monthlySavings,
  yearlySavings,
  paybackYears,
  twentyFiveYearSavings,
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
        <div className="text-3xl font-heading font-semibold text-accent mb-1">
          ৳{Math.round(monthlySavings).toLocaleString()}
        </div>
        <div className="text-sm text-ink-mid">Monthly Savings</div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
        <div className="text-3xl font-heading font-semibold text-accent mb-1">
          ৳{Math.round(yearlySavings).toLocaleString()}
        </div>
        <div className="text-sm text-ink-mid">Yearly Savings</div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
        <div className="text-3xl font-heading font-semibold text-accent mb-1">
          {paybackYears.toFixed(1)} yrs
        </div>
        <div className="text-sm text-ink-mid">Payback Period</div>
      </div>
      <div className="bg-white rounded-xl p-6 border border-ink/5 text-center">
        <div className="text-3xl font-heading font-semibold text-accent mb-1">
          ৳{Math.round(twentyFiveYearSavings).toLocaleString()}
        </div>
        <div className="text-sm text-ink-mid">25-Year Net Savings</div>
      </div>
    </div>
  );
}
