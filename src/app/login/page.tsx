"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../utils/auth";
import Link from "next/link";
import { toast } from "react-toastify"; // Importing toast
import "react-toastify/dist/ReactToastify.css"; // Importing default CSS for Toastify

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const data = await loginUser(email, password);
      if (data.token) {
        toast.success("Login successful!", {
          position: "top-right", // You can customize the position
          autoClose: 3000, // Duration before toast auto closes
        });
        router.push("/dashboard");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      toast.error("Login failed. Please try again.", {
        position: "top-right", // You can customize the position
        autoClose: 3000, // Duration before toast auto closes
      });
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-8 card p-8">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                className="input-field"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="input-field"
                placeholder="••••••••"
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  New to PostHub?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full inline-flex justify-center btn-secondary"
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/"
            className="text-primary hover:text-primary-dark text-md"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
