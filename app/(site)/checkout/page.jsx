"use client";

import { useCart } from "../../context/CartContext";
import { useState } from "react";
import OrderSuccess from "./components/checkout/OrderSuccess";
import EmptyCart from "./components/checkout/EmptyCart";
import CheckoutBreadcrumb from "./components/checkout/CheckoutBreadcrumb";
import ContactInfo from "./components/checkout/ContactInfo";
import ShippingAddress from "./components/checkout/ShippingAddress";
import PaymentMethod from "./components/checkout/PaymentMethod";
import OrderSummary from "./components/checkout/OrderSummary";

export default function CheckoutPage() {
  const { items, updateQuantity, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

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

  const districts = [
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Chittagong",
    "Comilla",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Rangpur",
    "Barisal",
    "Mymensingh",
  ];

  const handleShippingChange = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newOrderId = `SLR-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;
    setOrderId(newOrderId);
    clearCart();
    setIsProcessing(false);
    setOrderPlaced(true);
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

        <form onSubmit={handlePlaceOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <ContactInfo shipping={shipping} handleShippingChange={handleShippingChange} />
              <ShippingAddress
                shipping={shipping}
                handleShippingChange={handleShippingChange}
                districts={districts}
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
