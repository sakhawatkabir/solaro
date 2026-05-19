import { User, Phone, Mail } from "lucide-react";

export default function ContactInfo({ shipping, handleShippingChange }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-ink/5">
      <h2 className="text-xl font-heading font-semibold text-ink mb-6 flex items-center gap-2">
        <User size={20} className="text-accent" />
        Contact Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="checkout-name" className="block text-sm font-semibold text-ink mb-2">
            Full Name
          </label>
          <input
            id="checkout-name"
            type="text"
            name="name"
            value={shipping.name}
            onChange={handleShippingChange}
            required
            className="w-full px-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
            placeholder="Rahim Ahmed"
          />
        </div>
        <div>
          <label htmlFor="checkout-phone" className="block text-sm font-semibold text-ink mb-2">
            Phone Number
          </label>
          <div className="relative">
            <Phone
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
            />
            <input
              id="checkout-phone"
              type="tel"
              name="phone"
              value={shipping.phone}
              onChange={handleShippingChange}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
              placeholder="+880 17XX-XXXXXX"
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label htmlFor="checkout-email" className="block text-sm font-semibold text-ink mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-light"
            />
            <input
              id="checkout-email"
              type="email"
              name="email"
              value={shipping.email}
              onChange={handleShippingChange}
              required
              className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-ink/10 bg-white text-ink placeholder:text-ink-light focus:border-accent focus:ring-2 focus:ring-accent/10 outline-none transition-all"
              placeholder="rahim@email.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
