"use client";

import { create } from "zustand";

const initialState = {
  isProcessing: false,
  orderPlaced: false,
  orderId: "",
  error: "",
};

const useCheckoutStore = create((set) => ({
  ...initialState,

  setProcessing: () => set({ isProcessing: true, error: "" }),

  setSuccess: (orderId) =>
    set({ isProcessing: false, orderPlaced: true, orderId }),

  setError: (error) => set({ isProcessing: false, error }),

  reset: () => set(initialState),
}));

export function useCheckout() {
  const isProcessing = useCheckoutStore((s) => s.isProcessing);
  const orderPlaced = useCheckoutStore((s) => s.orderPlaced);
  const orderId = useCheckoutStore((s) => s.orderId);
  const error = useCheckoutStore((s) => s.error);
  const setProcessing = useCheckoutStore((s) => s.setProcessing);
  const setSuccess = useCheckoutStore((s) => s.setSuccess);
  const setError = useCheckoutStore((s) => s.setError);
  const reset = useCheckoutStore((s) => s.reset);

  return {
    isProcessing,
    orderPlaced,
    orderId,
    error,
    setProcessing,
    setSuccess,
    setError,
    reset,
  };
}
