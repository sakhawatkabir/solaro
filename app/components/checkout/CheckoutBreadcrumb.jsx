import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function CheckoutBreadcrumb() {
  return (
    <div className="flex items-center gap-2 text-sm text-ink-light mb-8">
      <Link href="/" className="hover:text-accent transition-colors">
        Home
      </Link>
      <ChevronRight size={14} />
      <Link href="/products" className="hover:text-accent transition-colors">
        Products
      </Link>
      <ChevronRight size={14} />
      <span className="text-ink font-medium">Checkout</span>
    </div>
  );
}
