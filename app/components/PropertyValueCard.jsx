export default function PropertyValueCard() {
  return (
    <div className="relative rounded-3xl overflow-hidden h-full min-h-[400px]">
      <img
        src="https://images.unsplash.com/photo-1700529289398-dd313f11c9cc?crop=entropy&cs=srgb&fm=jpg&q=85&w=800"
        alt="Worker installing solar panels on roof by David Clode on Unsplash"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/60 via-blue-500/50 to-blue-400/40"></div>

      <div className="relative h-full flex flex-col justify-between p-8 text-white">
        <div className="text-sm font-medium">
          Homes with solar panels sell faster and at higher prices.
        </div>

        <div className="space-y-2">
          <h3 className="text-4xl font-heading font-bold leading-tight">
            Increase{" "}
            <span className="relative inline-block">
              Property
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="#0BDA51"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Value.
          </h3>
        </div>
      </div>
    </div>
  );
}
