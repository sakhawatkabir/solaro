import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <ShoppingCart size={64} className="text-ink-faint mx-auto mb-6" />
        <h1 className="text-3xl font-heading font-semibold text-ink mb-4">
          Your cart is empty
        </h1>
        <p className="text-ink-mid mb-8">
          Browse our solar products and add items to your cart.
        </p>
        <Link href="/products">
          <span className="px-8 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent-mid transition-colors inline-block">
            View Products
          </span>
        </Link>
      </div>
    </section>
  );
}
