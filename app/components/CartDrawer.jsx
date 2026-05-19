"use client";

import { m, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import Link from "next/link";
import Image from "next/image";
import { useReducedMotion } from "../hooks/useReducedMotion";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    removeItem,
    updateQuantity,
    totalItems,
    totalPrice,
  } = useCart();
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <m.div
            initial={prefersReducedMotion ? {} : { x: "100%" }}
            animate={{ x: 0 }}
            exit={prefersReducedMotion ? {} : { x: "100%" }}
            transition={prefersReducedMotion ? {} : { type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream shadow-2xl z-[70] flex flex-col font-body"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-ink/10">
              <div className="flex items-center gap-3">
                <ShoppingBag size={22} className="text-accent" />
                <h2 className="text-xl font-heading font-semibold text-ink">
                  Your Cart ({totalItems})
                </h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={22} className="text-ink" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-ink-faint mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-ink mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-ink-mid text-sm mb-6 max-w-[250px]">
                    Browse our solar kits and panels to build your perfect
                    system.
                  </p>
                  <Link href="/products" onClick={() => setIsOpen(false)}>
                    <span className="px-6 py-3 bg-accent hover:bg-accent-mid text-white rounded-full font-semibold text-sm transition-colors cursor-pointer">
                      View Products
                    </span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <m.div
                      key={item.id}
                      layout
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={prefersReducedMotion ? {} : { opacity: 0, x: 100 }}
                      className="flex gap-4 bg-white rounded-xl p-4 border border-ink/5"
                    >
                      <div className="size-20 rounded-lg overflow-hidden bg-cream flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-ink text-sm leading-tight mb-1 truncate">
                          {item.title}
                        </h4>
                        <p className="text-accent font-semibold text-sm mb-3">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="size-7 flex items-center justify-center rounded-full border border-ink/20 hover:bg-ink/5 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold w-6 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="size-7 flex items-center justify-center rounded-full border border-ink/20 hover:bg-ink/5 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-1.5 text-ink-light hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </m.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-6 space-y-5 bg-white">
                <div className="space-y-2">
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
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <span className="block w-full py-3.5 bg-accent hover:bg-accent-mid text-white text-center rounded-full font-semibold transition-colors cursor-pointer">
                      Proceed to Checkout
                    </span>
                  </Link>
                 
                </div>
              </div>
            )}
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
