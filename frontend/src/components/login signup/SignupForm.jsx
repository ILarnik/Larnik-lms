import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signup,sendOtp ,verifyOtp } from "../../api/api"; 
import CustomButton from "../ui/CustomButton";

export default function Signup({ role }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    universityCode: "",
    referralCode: "",
    otp: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step 1: Send OTP
  const handleSendOtp = async () => {
    if (!form.email) {
      alert("Enter your email first!");
      return;
    }
    try {
      await sendOtp({ email: form.email });
      alert("OTP sent to your email 📩");
      setIsOtpSent(true);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async () => {
    try {
      const data = {
        email: form.email, otp: form.otp
      }

      // await verifyOtp({ email: form.email, otp: form.otp });
      await verifyOtp(data);
      // console.log(email,"em");
      
      alert("Email verified ✅");
      setIsOtpVerified(true);
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
      setIsOtpVerified(false);
    }
  };

  // Step 3: Signup only if OTP verified
  const handleSignup = async () => {
    if (!isOtpVerified) {
      alert("Please verify your email before signing up.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const payload = {
        name: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
        roles: [role.toLowerCase()],
        universityCode: form.universityCode || undefined,
        referralCode: form.referralCode || undefined,
      };

      const { data } = await signup(payload);

      alert(`Account created ✅\n${data.message}`);
      localStorage.setItem("token", data.token || "");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
    <div className="w-full max-w-md bg-white p-4 sm:p-6 rounded-2xl shadow-md border">
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Create Account</h2>
      <p className="text-gray-500 mb-6">Continue as {role}</p>

      {/* Full Name */}
      <input
        name="fullName"
        type="text"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />

      {/* Email + Verify */}
      <div className="mb-3 flex flex-col sm:flex-row gap-3">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <div className="sm:w-auto w-full">
          <CustomButton
            label={isOtpSent ? "Resend" : "Verify"}
            onClick={handleSendOtp}
            className="w-full sm:w-auto bg-black"
          />
        </div>
      </div>

      {/* OTP Verification */}
      {isOtpSent && (
        <div className="mb-3 flex flex-col sm:flex-row gap-3">
          <input
            name="otp"
            type="text"
            placeholder="Enter OTP"
            value={form.otp}
            onChange={handleChange}
            className="flex-1 border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          />
          <div className="sm:w-auto w-full">
            <CustomButton
              label="Verify"
              onClick={handleVerifyOtp}
              className="w-full sm:w-auto bg-green-600"
            />
          </div>
        </div>
      )}

      {/* Phone */}
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />

      {/* Password */}
      <div className="relative mb-3">
        <input
          name="password"
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
        <button
          type="button"
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          aria-label={passwordVisible ? "Hide password" : "Show password"}
        >
          {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
        className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
      />

      {/* Role specific fields */}
      {role?.toLowerCase() === "student" && (
        <input
          name="referralCode"
          placeholder="Referral Code"
          value={form.referralCode}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      )}
      {role?.toLowerCase() === "teacher" && (
        <input
          name="universityCode"
          placeholder="University Code"
          value={form.universityCode}
          onChange={handleChange}
          className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      )}

      {/* Signup button (disabled until OTP verified) */}
      <button
        onClick={handleSignup}
        disabled={!isOtpVerified}
        className={`w-full rounded-lg p-3 font-medium transition-colors ${
          isOtpVerified
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        aria-disabled={!isOtpVerified}
      >
        Create Account
      </button>
    </div>
  </div>
);

}
