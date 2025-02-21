"use client";

import { useState } from "react";
import SignInForm from "@/app/components/auth/SignInForm";
import SignUpForm from "@/app/components/auth/SignUpForm";

export default function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-sm w-full space-y-3">
        <div className="space-y-1.5">
          <h2 className="mt-6 text-center text-3xl font-bold font-display">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </h2>
          <p className="text-muted text-center">
            {mode === "signin"
              ? "Sign in to access your account"
              : "Create a new account to get started"}
          </p>
        </div>

        {mode === "signin" ? <SignInForm /> : <SignUpForm />}

        <div className="text-center">
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="font-medium text-muted hover:text-indigo-500"
          >
            {mode === "signin"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
