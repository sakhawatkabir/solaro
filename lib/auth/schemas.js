import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const ResetSchema = z.object({
  email: z.string().email("Email is required"),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  token: z.string().optional(),
});

export const SettingsSchema = z.object({
  name: z.optional(z.string().min(2)),
  password: z.optional(z.string().min(8)),
  newPassword: z.optional(z.string().min(8)),
});

export const TwoFactorSchema = z.object({
  code: z.string().min(6, "Code must be 6 characters"),
  token: z.string().optional(),
});
