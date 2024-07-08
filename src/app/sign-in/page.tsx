"use client";
import FormInput from "@/components/FormInput";
import { formatZodErrors } from "@/libs/errorHandling";
import { signInSchema } from "@/libs/validation";
import { signIn } from "@/services/authService";
import Link from "next/link";
import React, { useState } from "react";
import { ZodError } from "zod";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors, [field]: undefined };
      if (!value) delete newErrors[field];
      return newErrors;
    });

    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      signInSchema.parse({ email, password });
      await signIn(email, password);
      window.location.href = "/dashboard";
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(formatZodErrors(error));
      } else if (error instanceof Error) {
        setServerError(error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign in</h1>
          <p className="py-6">Enter your credentials to access your account.</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl min-w-[328px]">
          <form className="card-body" onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              error={errors["email"]}
              onChange={(value) => handleInputChange("email", value)}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="password"
              value={password}
              error={errors["password"]}
              onChange={(value) => handleInputChange("password", value)}
            />
            <div className="form-control mt-6">
              {!serverError && Object.keys(errors).length > 0 && (
                <p className="text-xs text-error mb-2">
                  Please fix the errors above before submitting.
                </p>
              )}
              {serverError && (
                <p className="text-xs text-error mb-2">{serverError}</p>
              )}
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/sign-up"
                className="text-sm text-blue-500 hover:underline"
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
