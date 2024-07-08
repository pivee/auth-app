"use client";
import React, { useState } from "react";
import { ZodError } from "zod";
import { signUp } from "../../services/authService";
import { signUpSchema } from "@/libs/validation";
import { formatZodErrors } from "@/libs/errorHandling";
import FormInput from "@/components/FormInput";
import Link from "next/link";

const SignUp = () => {
  const [name, setName] = useState("");
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

    if (field === "name") setName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      signUpSchema.parse({ name, email, password });
      await signUp(name, email, password);
      window.location.href = "/";
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
          <h1 className="text-5xl font-bold">Sign up</h1>
          <p className="py-6">Enter your details to create an account.</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl min-w-[328px]">
          <form className="card-body" onSubmit={handleSubmit}>
            <FormInput
              label="Name"
              type="text"
              placeholder="John Doe"
              value={name}
              error={errors["name"]}
              onChange={(value) => handleInputChange("name", value)}
            />
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
                Create account
              </button>
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/sign-in"
                className="text-sm text-blue-500 hover:underline"
              >
                Sign in if you already have an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
