 import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // ✅ correct import
import UniversitySettlement from "../../pages/UniversitySettlement.jsx";
import FinanceManager from "../../pages/FinanceManager.jsx";

export default function FinanceSettlementDashboard() {
  const [activeTab, setActiveTab] = useState("university");
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("🔍 Full decoded token:", decoded);

        // Normalize roles
        let roleFromToken =
          decoded.role || decoded.roles?.[0] || decoded.userRole;

        // Special handling for finance managers
        if (decoded.role === "sub-admin" && decoded.subAdminRole === "finance_manager") {
          roleFromToken = "finance";
        }

        const idFromToken = decoded.id || decoded.userId || decoded._id;

        setUserRole(roleFromToken);
        setUserId(idFromToken);

        localStorage.setItem("role", roleFromToken);
        localStorage.setItem("userId", idFromToken);

        console.log("✅ Normalized Role/UserId:", roleFromToken, idFromToken);
      } catch (err) {
        console.error("❌ Failed to decode token:", err);
      }
    } else {
      console.warn("⚠️ No token found in localStorage");
    }
    setLoading(false);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "university":
        if (userRole !== "university") {
          return <p className="text-red-600">⚠️ Only university users can access this section</p>;
        }
        return <UniversitySettlement universityId={userId} />;

      case "finance":
        if (userRole !== "finance") {
          return <p className="text-red-600">⚠️ Only finance managers can access this section</p>;
        }
        // Pass ownerType as "teacher" to fetch teacher wallets by default
        return <FinanceManager walletOwnerId={userId} ownerType="teacher" />;

      default:
        return null;
    }
  };

  if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gray-50">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Finance & Settlement Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 justify-center">
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

      <div>{renderTabContent()}</div>
    </div>
  );
}
