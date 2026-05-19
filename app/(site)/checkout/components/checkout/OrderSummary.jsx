import { Shield, Clock } from "lucide-react";
import { formatPrice } from "../../../../data/products";
import Image from "next/image";

export default function OrderSummary({
  items,
  updateQuantity,
  totalPrice,
  isProcessing,
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-ink/5 sticky top-24">
      <h3 className="font-heading font-semibold text-ink text-lg mb-4">
        Order Summary
      </h3>

      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="size-16 rounded-lg overflow-hidden bg-cream flex-shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-ink text-sm truncate">
                {item.title}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="size-6 flex items-center justify-center rounded-full border border-ink/20 text-xs hover:bg-ink/5 transition-colors"
                >
                  -
                </button>
                <span className="text-sm font-medium w-4 text-center">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="size-6 flex items-center justify-center rounded-full border border-ink/20 text-xs hover:bg-ink/5 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div className="text-sm font-semibold text-ink whitespace-nowrap">
              {formatPrice(item.price * item.quantity)}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6 pt-4 border-t border-ink/10">
        <div className="flex justify-between text-sm text-ink-mid">
          <span>Subtotal</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm text-ink-mid">
          <span>Delivery & Installation</span>
          <span className="text-accent font-semibold">FREE</span>
        </div>
        <div className="flex justify-between text-lg font-heading font-semibold text-ink pt-3 border-t border-ink/10">
          <span>Total</span>
          <span className="text-accent">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full py-4 bg-accent hover:bg-accent-mid disabled:bg-accent/50 text-white font-semibold rounded-full transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>Place Order</>
        )}
      </button>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-xs text-ink-mid">
          <Shield size={14} className="text-accent" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-ink-mid">
          <Clock size={14} className="text-accent" />
          <span>Installation in 3-5 days</span>
        </div>
      </div>
    </div>
  );
}
