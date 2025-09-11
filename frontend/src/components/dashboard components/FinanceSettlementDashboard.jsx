 import React, { useState } from "react";
import TeacherWallet from "../../pages/TeacherWallet.jsx";
import UniversitySettlement from "../../pages/UniversitySettlement.jsx";
import FinanceManager from "../../pages/FinanceManager.jsx";

export default function FinanceSettlementDashboard() {
  const [activeTab, setActiveTab] = useState("teacher");

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

      {/* Render components */}
      <div>
        {activeTab === "teacher" && <TeacherWallet />}
        {activeTab === "university" && <UniversitySettlement />}
        {activeTab === "finance" && <FinanceManager />}
      </div>
    </div>
  );
}
