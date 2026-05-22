"use client";

import { useReducer, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { activateUser } from "@/app/actions/auth/activation";
import { XCircle, Loader2 } from "lucide-react";
import ActivateSuccessState from "./ActivateSuccessState";
import ActivateFormHeader from "./ActivateFormHeader";
import ActivatePasswordFields from "./ActivatePasswordFields";

const initialState = {
  password: "",
  confirmPassword: "",
  showPassword: false,
  loading: false,
  error: "",
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_START":
      return { ...state, loading: true, error: "" };
    case "SUBMIT_SUCCESS":
      return { ...state, loading: false, success: true };
    case "SUBMIT_ERROR":
      return { ...state, loading: false, error: action.error };
    case "VALIDATION_ERROR":
      return { ...state, error: action.error };
    default:
      return state;
  }
}

function ActivateFormContent() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.password || state.password.length < 6) {
      dispatch({
        type: "VALIDATION_ERROR",
        error: "Password must be at least 6 characters.",
      });
      return;
    }
    if (state.password !== state.confirmPassword) {
      dispatch({ type: "VALIDATION_ERROR", error: "Passwords do not match." });
      return;
    }
    if (!token) {
      dispatch({ type: "VALIDATION_ERROR", error: "Invalid activation link." });
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    try {
      await activateUser(token, state.password);
      dispatch({ type: "SUBMIT_SUCCESS" });
      setTimeout(() => push("/login"), 2000);
    } catch (err) {
      dispatch({ type: "SUBMIT_ERROR", error: err.message });
    }
  };

  if (state.success) {
    return <ActivateSuccessState />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <ActivateFormHeader />

        <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {state.error && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                <XCircle className="size-4 flex-shrink-0" />
                {state.error}
              </div>
            )}

            <ActivatePasswordFields state={state} dispatch={dispatch} />

            <button
              type="submit"
              disabled={state.loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-500/50 text-white rounded-xl text-sm font-medium transition-colors"
            >
              {state.loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Activate Account"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-zinc-500 mt-6">
          Didn't expect this email? You can safely ignore it.
        </p>
      </div>
    </div>
  );
}

export default function ActivateForm() {
  return (
    <Suspense>
      <ActivateFormContent />
    </Suspense>
  );
}
