export default function SavingsCard() {
  return (
    <div className="bg-gradient-to-br from-cream-dark to-accent rounded-3xl p-8 text-white relative overflow-hidden min-h-[400px] flex flex-col justify-between">
      <div className="absolute top-0 right-0 size-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div>
        <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
          Average Savings
        </div>

        <h3 className="text-5xl font-heading font-semibold mb-4">
          Save Up To
          <br />
          <span className="text-6xl">70%</span>
        </h3>
      </div>

      <div>
        <p className="text-white/90 text-lg">
          On your monthly electricity bills with our premium solar panel
          solutions.
        </p>
      </div>
    </div>
  );
}
