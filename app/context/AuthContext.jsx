"use client";

import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  loginAction,
  registerAction,
  forgotPasswordAction,
  resetPasswordAction,
  verify2FAAction,
  send2FACodeAction,
  resendVerificationAction,
  updateProfileAction,
} from "@/app/actions/auth";

const AuthContext = createContext(null);

async function fetchSession() {
  try {
    const res = await fetch("/api/auth/session", {
      cache: "no-store",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Session fetch error:", err);
    return { authenticated: false };
  }
}

export function AuthProvider({ children }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: session,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["session"],
    queryFn: fetchSession,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const user = session?.authenticated ? session.user : null;

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => loginAction(email, password),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["session"], {
          authenticated: true,
          user: data.user,
        });
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }) =>
      registerAction(name, email, password),
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Logout failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["session"], { authenticated: false });
      queryClient.invalidateQueries({ queryKey: ["session"] });
      router.push("/login");
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (email) => forgotPasswordAction(email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ password, token }) => resetPasswordAction(password, token),
  });

  const verify2FAMutation = useMutation({
    mutationFn: (code) => verify2FAAction(code),
    onSuccess: (data) => {
      if (data.success) {
        queryClient.setQueryData(["session"], {
          authenticated: true,
          user: data.user,
        });
      }
    },
  });

  const send2FACodeMutation = useMutation({
    mutationFn: (email) => send2FACodeAction(email),
  });

  const resendVerificationMutation = useMutation({
    mutationFn: (email) => resendVerificationAction(email),
  });

  const updateProfileMutation = useMutation({
    mutationFn: ({ name, password, newPassword }) =>
      updateProfileAction(name, password, newPassword),
    onSuccess: (data, variables) => {
      if (data.success) {
        queryClient.setQueryData(["session"], (old) => {
          if (!old?.authenticated) return old;
          return {
            ...old,
            user: {
              ...old.user,
              ...(variables.name ? { name: variables.name } : {}),
            },
          };
        });
      }
    },
  });

  const login = async (email, password) => {
    return loginMutation.mutateAsync({ email, password });
  };

  const register = async (name, email, password) => {
    return registerMutation.mutateAsync({ name, email, password });
  };

  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  const forgotPassword = async (email) => {
    return forgotPasswordMutation.mutateAsync(email);
  };

  const resetPassword = async (password, token) => {
    return resetPasswordMutation.mutateAsync({ password, token });
  };

  const verify2FA = async (code) => {
    return verify2FAMutation.mutateAsync(code);
  };

  const resend2FACode = async (email) => {
    return send2FACodeMutation.mutateAsync(email);
  };

  const resendVerification = async (email) => {
    return resendVerificationMutation.mutateAsync(email);
  };

  const updateProfile = async ({ name, password, newPassword }) => {
    return updateProfileMutation.mutateAsync({ name, password, newPassword });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: isLoading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        verify2FA,
        resend2FACode,
        resendVerification,
        updateProfile,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
