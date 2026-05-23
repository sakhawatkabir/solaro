"use client";

import { useCart } from "../../store/cart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import OrderSuccess from "./components/checkout/OrderSuccess";
import EmptyCart from "./components/checkout/EmptyCart";
import CheckoutBreadcrumb from "./components/checkout/CheckoutBreadcrumb";
import ContactInfo from "./components/checkout/ContactInfo";
import ShippingAddress from "./components/checkout/ShippingAddress";
import PaymentMethod from "./components/checkout/PaymentMethod";
import OrderSummary from "./components/checkout/OrderSummary";
import { createOrder } from "@/app/actions/orders";

export default function CheckoutPage() {
  const { items, updateQuantity, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState("");

  const [shipping, setShipping] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    district: "",
    city: "",
    notes: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const { data: sessionData, isLoading: sessionLoading } = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      const res = await fetch("/api/auth/session");
      if (!res.ok) throw new Error("Failed to fetch session");
      return res.json();
    },
  });

  const { data: districtsData, isLoading: districtsLoading } = useQuery({
    queryKey: ["districts"],
    queryFn: async () => {
      const res = await fetch("/api/districts?limit=100");
      if (!res.ok) throw new Error("Failed to fetch districts");
      return res.json();
    },
  });

  const districts = districtsData?.districts?.map((d) => d.name) || [];
  const user = sessionData?.user;

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      }));

      const fullAddress = [shipping.address, shipping.city, shipping.district]
        .filter(Boolean)
        .join(", ");

      const result = await createOrder({
        userId: user?.id || null,
        customerName: shipping.name || user?.name || "",
        customerEmail: shipping.email || user?.email || "",
        customerPhone: shipping.phone,
        district: shipping.district,
        items: orderItems,
        subtotal: totalPrice,
        vat: 0,
        discount: 0,
        total: totalPrice,
        status: "PENDING",
        paymentMethod: paymentMethod === "cod" ? "COD" : "ADVANCE",
        paymentStatus: "UNPAID",
        shippingAddress: fullAddress,
        notes: shipping.notes || null,
      });

      if (result.success) {
        setOrderId(result.order.orderNumber);
        clearCart();
        setOrderPlaced(true);
      } else {
        setError(result.error || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return <OrderSuccess orderId={orderId} />;
  }

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className="pt-32 pb-20 px-8 lg:px-16">
      <div className="max-w-[1400px] mx-auto">
        <CheckoutBreadcrumb />

        <h1 className="text-3xl lg:text-4xl font-heading font-semibold text-ink mb-8">
          Checkout
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo
                shipping={shipping}
                handleShippingChange={handleShippingChange}
                user={user}
              />
              <ShippingAddress
                shipping={shipping}
                handleShippingChange={handleShippingChange}
                districts={districts}
                districtsLoading={districtsLoading}
              />
              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
              />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary
                items={items}
                updateQuantity={updateQuantity}
                totalPrice={totalPrice}
                isProcessing={isProcessing}
              />
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
