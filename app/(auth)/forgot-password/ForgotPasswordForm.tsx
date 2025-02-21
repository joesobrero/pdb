"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/pro-regular-svg-icons";
import Button from "@/app/components/interactive/button";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="space-y-3 min-h-72 flex-col flex justify-center animate-fade-in"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          Check your email for the password reset link
        </div>
      ) : (
        <>
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full pl-12 pr-4 py-3 bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full justify-center"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </>
      )}
    </form>
  );
}
