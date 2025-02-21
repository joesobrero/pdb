"use client";

import SignUpForm from "@/app/(auth)/sign-up/SignUpForm";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <>
      <div className="space-y-1.5 animate-fade-in ">
        <h2 className="mt-6 text-center text-3xl font-bold font-display">
          Sign up
        </h2>
        <p className="text-muted text-center">
          Create a new account to get started
        </p>
      </div>

      <SignUpForm />

      <div className="text-center animate-fade-in ">
        <Link
          href="/sign-in"
          className="font-medium text-muted hover:text-content block w-full"
        >
          Already have an account? Sign in
        </Link>
      </div>
    </>
  );
}
