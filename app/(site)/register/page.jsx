"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import RegisterForm from "./RegisterForm";
import RegisterPromo from "./RegisterPromo";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  showConfirm: false,
  isLoading: false,
  error: "",
  success: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_START":
      return { ...state, isLoading: true, error: "" };
    case "SUBMIT_SUCCESS":
      return { ...state, isLoading: false, success: true };
    case "SUBMIT_ERROR":
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
}

export default function RegisterPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { push } = useRouter();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!state.name || !state.email || !state.password) {
      dispatch({
        type: "SUBMIT_ERROR",
        error: "Please fill in all required fields.",
      });
      return;
    }

    if (state.password !== state.confirmPassword) {
      dispatch({ type: "SUBMIT_ERROR", error: "Passwords do not match." });
      return;
    }

    if (state.password.length < 8) {
      dispatch({
        type: "SUBMIT_ERROR",
        error: "Password must be at least 8 characters.",
      });
      return;
    }

    dispatch({ type: "SUBMIT_START" });

    const result = await register(state.name, state.email, state.password);

    if (result.error) {
      dispatch({ type: "SUBMIT_ERROR", error: result.error });
      return;
    }

    dispatch({ type: "SUBMIT_SUCCESS" });
    setTimeout(() => push("/login"), 3000);
  };

  return (
    <section className="pt-32 pb-20 px-8 lg:px-16 min-h-screen flex items-center">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <RegisterForm
            state={state}
            dispatch={dispatch}
            onSubmit={handleSubmit}
          />
          <RegisterPromo />
        </div>
      </div>
    </section>
  );
}
