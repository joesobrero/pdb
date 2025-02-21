"use client";

import SignInForm from "@/app/(auth)/sign-in/SignInForm";
import Link from "next/link";

export default function SignInPage() {
  return (
    <>
      <div className="space-y-1.5 animate-fade-in ">
        <h2 className="mt-6 text-center text-3xl font-bold font-display">
          Sign in
        </h2>
        <p className="text-muted text-center">Sign in to access your account</p>
      </div>

      <SignInForm />

      <div className="text-center animate-fade-in space-y-2 ">
        <Link
          href="/sign-up"
          className="font-medium text-muted hover:text-content block w-full"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </div>
    </>
  );
}
