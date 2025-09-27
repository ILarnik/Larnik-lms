import React, { useState } from "react";
import SignupForm from "./SignupForm";
import CustomButton from "../ui/CustomButton";

export default function JoinAs() {
  const [selectedRole, setSelectedRole] = useState("student");

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6">
    {/* Container */}
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-4 sm:p-6 md:p-8 border">
      {/* Role selection */}
      <h2 className="text-center font-semibold text-lg mb-4 text-gray-800">Join as</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
        <button
          onClick={() => setSelectedRole("student")}
          aria-pressed={selectedRole === "student"}
          className={`w-full p-3 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base
            ${selectedRole === "student" ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"}`}
        >
          Student
        </button>

        <button
          onClick={() => setSelectedRole("teacher")}
          aria-pressed={selectedRole === "teacher"}
          className={`w-full p-3 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base
            ${selectedRole === "teacher" ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"}`}
        >
          Teacher
        </button>

        <button
          onClick={() => setSelectedRole("university")}
          aria-pressed={selectedRole === "university"}
          className={`w-full p-3 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base
            ${selectedRole === "university" ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"}`}
        >
          University
        </button>

        <button
          onClick={() => setSelectedRole("referral")}
          aria-pressed={selectedRole === "referral"}
          className={`w-full p-3 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base
            ${selectedRole === "referral" ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"}`}
        >
          Referral Partner
        </button>

        {/* Super Admin */}
        <button
          onClick={() => setSelectedRole("superadmin")}
          aria-pressed={selectedRole === "superadmin"}
          className={`w-full p-3 rounded-full border-2 transition-all focus:outline-none focus:ring-2 focus:ring-green-300 text-sm sm:text-base
            ${selectedRole === "superadmin" ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" : "bg-white text-gray-700 hover:bg-gray-100 border-gray-200"}`}
        >
          Super Admin
        </button>
      </div>

      {/* Display selected role content */}
      <div className="border p-4 sm:p-6 rounded-xl min-h-[150px] flex items-center justify-center">
        {!selectedRole && (
          <p className="text-gray-400 text-center">Select a role card above to continue</p>
        )}

        {selectedRole === "student" && <SignupForm role="Student" />}

        {selectedRole === "teacher" && <SignupForm role="Teacher" />}

        {selectedRole === "university" && <SignupForm role="University" />}

        {selectedRole === "referral" && <SignupForm role="Referral" />}

        {selectedRole === "superadmin" && <SignupForm role="SuperAdmin" />}
      </div>
    </div>
  </div>
);

}
