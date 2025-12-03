import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react";
import CustomButton from "../components/ui/CustomButton";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }

      setSuccess(true);

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-100 px-4 py-8">
        <div className="w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md bg-white text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Password Reset Successful!</h2>
          <p className="text-gray-500 mb-6 text-sm sm:text-base">
            Your password has been reset successfully. Redirecting to login...
          </p>
          <Link
            to="/login"
            className="inline-flex items-center text-emerald-600 font-semibold hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-100 px-4 py-8">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md bg-white">
        <Link
          to="/login"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4 text-sm"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Login
        </Link>

        <h2 className="text-xl sm:text-2xl font-bold mb-2">Reset Password</h2>
        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          Enter your new password below.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-4 relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full border rounded-lg p-3 pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="New Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 bg-transparent p-0 m-0 hover:text-emerald-600 focus:outline-none border-none"
                style={{ border: "none" }}
                onClick={() => setPasswordVisible(!passwordVisible)}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6 relative">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full border rounded-lg p-3 pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
                aria-label="Confirm Password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 bg-transparent p-0 m-0 hover:text-emerald-600 focus:outline-none border-none"
                style={{ border: "none" }}
                onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                aria-label={confirmPasswordVisible ? "Hide password" : "Show password"}
                tabIndex={0}
              >
                {confirmPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <CustomButton
              label={loading ? "Resetting..." : "Reset Password"}
              type="submit"
              className="w-full bg-black"
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
