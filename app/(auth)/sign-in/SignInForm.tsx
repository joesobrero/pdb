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
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const supabase = createClient();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push("/dashboard");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSignIn}
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

      <Link
        href="/forgot-password"
        className="font-medium text-muted hover:text-content w-full text-right text-xs"
      >
        Forgot your password?
      </Link>

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full justify-center mt-1.5"
      >
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
