"use client";

import { m } from "framer-motion";
import { useReducer, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useAuth } from "../../context/AuthContext";
import LoadingState from "./LoadingState";
import SuccessState from "./SuccessState";
import ErrorState from "./ErrorState";
import IdleState from "./IdleState";

const initialState = {
  email: "",
  resendLoading: false,
  resendSuccess: false,
  resendError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.email };
    case "RESEND_START":
      return {
        ...state,
        resendLoading: true,
        resendError: "",
        resendSuccess: false,
      };
    case "RESEND_SUCCESS":
      return { ...state, resendLoading: false, resendSuccess: true };
    case "RESEND_ERROR":
      return { ...state, resendLoading: false, resendError: action.error };
    default:
      return state;
  }
}

export default function VerifyEmailForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchParams = useSearchParams();
  const prefersReducedMotion = useReducedMotion();
  const { resendVerification } = useAuth();
  const transitionDuration = prefersReducedMotion ? 0 : 0.6;

  const token = searchParams.get("token");
  const resendEmail = searchParams.get("resend");

  useEffect(() => {
    if (resendEmail) {
      dispatch({ type: "SET_EMAIL", email: resendEmail });
    }
  }, [resendEmail]);

  const {
    isLoading: isVerifying,
    isError,
    error: queryError,
    data,
  } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: async () => {
      const res = await fetch(`/api/auth/verify-email?token=${token}`);
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(
          json.error ||
            "Verification failed. The token may be invalid or expired.",
        );
      }
      return json;
    },
    enabled: !!token,
    retry: false,
  });

  const handleResend = async (e) => {
    e.preventDefault();

    if (!state.email) {
      dispatch({
        type: "RESEND_ERROR",
        error: "Please enter your email address.",
      });
      return;
    }

    dispatch({ type: "RESEND_START" });
    const result = await resendVerification(state.email);

    if (result.error) {
      dispatch({ type: "RESEND_ERROR", error: result.error });
    } else {
      dispatch({ type: "RESEND_SUCCESS" });
    }
  };

  let status, message;
  if (!token) {
    status = "idle";
    message = "";
  } else if (isVerifying) {
    status = "loading";
    message = "";
  } else if (isError) {
    status = "error";
    message =
      queryError?.message ||
      "Verification failed. The token may be invalid or expired.";
  } else if (data) {
    status = "success";
    message = "Your email has been verified successfully! You can now sign in.";
  } else {
    status = "loading";
    message = "";
  }

  return (
    <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
      <div className="max-w-md mx-auto w-full text-center">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: transitionDuration }}
        >
          {status === "loading" && <LoadingState />}
          {status === "success" && <SuccessState message={message} />}
          {status === "error" && (
            <ErrorState
              message={message}
              state={state}
              dispatch={dispatch}
              handleResend={handleResend}
            />
          )}
          {status === "idle" && (
            <IdleState
              state={state}
              dispatch={dispatch}
              handleResend={handleResend}
            />
          )}
        </m.div>
      </div>
    </section>
  );
}
