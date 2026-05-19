import { Truck, MapPin } from "lucide-react";

export default function ShippingAddress({ shipping, handleShippingChange, districts }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-ink/5">
      <h2 className="text-xl font-heading font-semibold text-ink mb-6 flex items-center gap-2">
        <Truck size={20} className="text-accent" />
        Delivery Address
      </h2>
      <div className="space-y-5">
        <div>
          <label htmlFor="checkout-address" className="block text-sm font-semibold text-ink mb-2">
            Street Address
          </label>
          <div className="relative">
            <MapPin
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
            />
            <input
              id="checkout-address"
              type="text"
              name="address"
              value={shipping.address}
              onChange={handleShippingChange}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
              placeholder="House 12, Road 5, Block C"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="checkout-district" className="block text-sm font-semibold text-ink mb-2">
              District
            </label>
            <select
              id="checkout-district"
              name="district"
              value={shipping.district}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all appearance-none"
            >
              <option value="">Select district</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="checkout-city" className="block text-sm font-semibold text-ink mb-2">
              City / Area
            </label>
            <input
              id="checkout-city"
              type="text"
              name="city"
              value={shipping.city}
              onChange={handleShippingChange}
              required
              className="w-full px-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
              placeholder="Gulshan, Banani, etc."
            />
          </div>
        </div>
        <div>
          <label htmlFor="checkout-notes" className="block text-sm font-semibold text-ink mb-2">
            Delivery Notes (Optional)
          </label>
          <textarea
            id="checkout-notes"
            name="notes"
            value={shipping.notes}
            onChange={handleShippingChange}
            rows="2"
            className="w-full px-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all resize-none"
            placeholder="Any special instructions..."
          />
        </div>
      </div>
    </div>
  );
}
