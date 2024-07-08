import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least 1 letter")
    .regex(/[0-9]/, "Password must contain at least 1 number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least 1 special character"
    ),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
