import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/pro-regular-svg-icons";
import Button from "@/app/components/interactive/button";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      // Show success message or redirect
      alert("Check your email for the confirmation link");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className="space-y-3 min-h-72 flex-col flex justify-center animate-fade-in"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

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

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full pl-12 pr-12 py-3 bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer absolute inset-y-0 right-4 flex items-center text-muted hover:text-content"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted">
          <FontAwesomeIcon icon={faLock} />
        </div>
        <input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="w-full pl-12 pr-12 py-3 bg-base-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="cursor-pointer absolute inset-y-0 right-4 flex items-center text-muted hover:text-content"
        >
          <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
        </button>
      </div>

      <Button
        type="submit"
        disabled={loading}
        variant="primary"
        className="w-full justify-center mt-1.5"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </Button>
    </form>
  );
}
