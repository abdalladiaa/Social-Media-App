import z from "zod";

export const registerationSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be between 3 and 15 characters")
      .max(15, "Name must be between 3 and 15 characters"),
    username: z
      .string()
      .min(3, "Username must be between 3 and 15 characters")
      .max(15, "Username must be between 3 and 15 characters")
      .regex(
        /^[a-z0-9_]{3,15}$/,
        "Username can only contain lowercase letters, numbers, and underscores (3-15 characters)",
      ),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
        "Password must be at least 6 characters and include at least one uppercase letter, one lowercase letter, and one number",
      ),
    rePassword: z.string().min(1, "Please confirm your password"),
    dateOfBirth: z
      .string()
      .refine(
        (value) => new Date(value) < new Date(),
        "Date of birth must be in the past",
      ),
    gender: z.enum(["male", "female"]),
  })
  .refine((values) => values.rePassword === values.password, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

//!   ======================================== LOGIN ==================================

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/,
      "Incorrect password format. Password must be at least 6 characters with at least one uppercase letter, one lowercase letter, and one number",
    ),
});
