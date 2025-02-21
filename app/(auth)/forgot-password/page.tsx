"use client";

import ForgotPasswordForm from "@/app/(auth)/forgot-password/ForgotPasswordForm";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="space-y-1.5 animate-fade-in ">
        <h2 className="mt-6 text-center text-3xl font-bold font-display">
          Reset password
        </h2>
        <p className="text-muted text-center">
          Enter your email to reset your password
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="text-center animate-fade-in ">
        <Link
          href="/sign-in"
          className="font-medium text-muted hover:text-content block w-full"
        >
          Back to sign in
        </Link>
      </div>
    </>
  );
}
