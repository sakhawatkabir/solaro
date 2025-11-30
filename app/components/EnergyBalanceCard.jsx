export default function EnergyBalanceCard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-3xl p-8 text-black dark:text-white relative overflow-hidden transition-colors duration-300">
      <h3 className="text-2xl font-heading font-semibold mb-12 text-black dark:text-white">
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
            className="dark:stroke-[#2a2a2a] stroke-gray-300"
            strokeWidth="12"
          />

          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#0BDA51"
            strokeWidth="12"
            strokeDasharray="502"
            strokeDashoffset="125"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold">2.9kwh</div>
          </div>
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold">5.6kwh</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Produced
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
          <div className="text-left">
            <div className="text-2xl font-bold">2.3kwh</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Consumed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
