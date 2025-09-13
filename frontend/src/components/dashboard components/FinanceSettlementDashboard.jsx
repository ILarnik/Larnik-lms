 import React, { useState, useEffect } from "react";
import TeacherWallet from "../../pages/TeacherWallet.jsx";
import UniversitySettlement from "../../pages/UniversitySettlement.jsx";
import FinanceManager from "../../pages/FinanceManager.jsx";

export default function FinanceSettlementDashboard() {
  const [activeTab, setActiveTab] = useState("teacher");
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  // ✅ Load user info from localStorage
  useEffect(() => {
    const role = localStorage.getItem("role"); // teacher/university/finance
    const id = localStorage.getItem("userId");
    setUserRole(role);
    setUserId(id);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "teacher":
        if (userRole !== "teacher") {
          return <p className="text-red-600">⚠️ Only teachers can access this section</p>;
        }
        return <TeacherWallet />;
      case "university":
        if (userRole !== "university") {
          return <p className="text-red-600">⚠️ Only university users can access this section</p>;
        }
        return <UniversitySettlement universityId={userId} />;
      case "finance":
        if (userRole !== "finance") {
          return <p className="text-red-600">⚠️ Only finance managers can access this section</p>;
        }
        return <FinanceManager />;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Finance & Settlement Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "teacher" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("teacher")}
        >
          Teacher
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "university" ? "bg-green-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("university")}
        >
          University
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "finance" ? "bg-purple-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("finance")}
        >
          Finance Manager
        </button>
      </div>

      {/* Render tab content */}
      <div>{renderTabContent()}</div>
    </div>
  );
}
