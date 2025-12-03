import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import CustomButton from "../components/ui/CustomButton";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const body = { email, password };

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Login failed ❌");
        return;
      }

      // store token + user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("✅ Logged in successfully");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen bg-green-100 px-4 py-8">
    <div className="w-full max-w-md p-6 sm:p-8 rounded-xl shadow-md bg-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">Login</h2>
      <p className="text-gray-500 mb-6 text-sm sm:text-base">Sign in with Email & Password</p>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
          aria-label="Email"
        />
      </div>

      {/* Password */}
      <div className="mb-2 relative">
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border rounded-lg p-3 pr-12 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-label="Password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 bg-transparent p-0 m-0 hover:text-emerald-600 focus:outline-none border-none"
            style={{ border: 'none' }}
            onClick={() => setPasswordVisible(!passwordVisible)}
            aria-pressed={passwordVisible}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            tabIndex={0}
          >
            {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-end mt-1">
          <Link to="/forgot-password" className="text-xs text-emerald-600 hover:underline focus:outline-none">Forgot password?</Link>
        </div>
      </div>

      <div className="mb-4">
        <CustomButton
          label={loading ? "Logging in..." : "Login"}
          onClick={handleLogin}
          className="w-full bg-black"
        />
      </div>

      {/* Footer */}
      <p className="text-center text-sm mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-green-600 font-semibold">
          Sign up
        </Link>
      </p>
    </div>
  </div>
);

}
