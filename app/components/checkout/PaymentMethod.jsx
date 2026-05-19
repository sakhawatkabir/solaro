import { CreditCard, Wallet, Smartphone, Building2, Banknote } from "lucide-react";

const paymentMethods = [
  {
    id: "cod",
    label: "Cash on Delivery",
    desc: "Pay on delivery",
    icon: Wallet,
  },
  {
    id: "bkash",
    label: "bKash",
    desc: "Mobile payment",
    icon: Smartphone,
  },
  {
    id: "nagad",
    label: "Nagad",
    desc: "Mobile payment",
    icon: Smartphone,
  },
  {
    id: "bank",
    label: "Bank Transfer",
    desc: "Direct transfer",
    icon: Building2,
  },
  {
    id: "emi",
    label: "EMI (6-12 months)",
    desc: "Installment plan",
    icon: Banknote,
  },
];

export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  return (
    <div className="bg-white rounded-xl p-6 border border-ink/5">
      <h2 className="text-xl font-heading font-bold text-ink mb-6 flex items-center gap-2">
        <CreditCard size={20} className="text-accent" />
        Payment Method
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              paymentMethod === method.id
                ? "border-accent bg-accent/5"
                : "border-ink/10 hover:border-ink/20"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method.id}
              checked={paymentMethod === method.id}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-4 h-4 mt-0.5 text-accent focus:ring-accent/20"
            />
            <div>
              <div className="font-semibold text-ink text-sm flex items-center gap-2">
                <method.icon size={16} className="text-accent" />
                {method.label}
              </div>
              <div className="text-xs text-ink-mid">{method.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
