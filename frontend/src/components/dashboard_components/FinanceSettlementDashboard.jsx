 import React, { useState } from "react";
import {
  teacherRequestSettlement,
  universityRequestSettlement,
  universityApproveSettlement,
  referralRequestSettlement,
  financeApproveSettlement,
  financeRejectSettlement,
} from "../../api/api";
import { getPendingSettlements } from "../../api/api";

export default function SettlementDashboard() {
  const [activeTab, setActiveTab] = useState("teacher");
  const [amount, setAmount] = useState("");
  const [requestId, setRequestId] = useState("");
  const [message, setMessage] = useState("");

  const handleApiCall = async (apiFn, payload) => {
    try {
      const res = await apiFn(payload);
      setMessage(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setMessage(err.response?.data?.message || "Error calling API");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Settlement Dashboard</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["teacher", "university", "referral", "finance"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setMessage("");
              setAmount("");
              setRequestId("");
            }}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Teacher Settlement */}
      {activeTab === "teacher" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Teacher Settlement</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border p-2 rounded w-64"
          />
          <button
            onClick={() =>
              handleApiCall(teacherRequestSettlement, { amount: Number(amount) })
            }
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Request Settlement
          </button>
        </div>
      )}

      {/* University Settlement */}
      {activeTab === "university" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">University Settlement</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border p-2 rounded w-64"
          />
          <div className="space-x-2">
            <button
              onClick={() =>
                handleApiCall(universityRequestSettlement, {
                  amount: Number(amount),
                })
              }
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Request Settlement
            </button>
            <button
              onClick={() =>
                handleApiCall(universityApproveSettlement, { requestId })
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Approve Settlement
            </button>
            <input
              type="text"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              placeholder="Enter Request ID"
              className="border p-2 rounded w-64 mt-2 block"
            />
          </div>
        </div>
      )}

      {/* Referral Settlement */}
      {activeTab === "referral" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Referral Partner Settlement</h2>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border p-2 rounded w-64"
          />
          <button
            onClick={() =>
              handleApiCall(referralRequestSettlement, {
                amount: Number(amount),
              })
            }
            className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
          >
            Request Settlement
          </button>
        </div>
      )}

      {/* Finance Settlement */}
      {activeTab === "finance" && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Finance Manager Settlement</h2>
          <input
            type="text"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
            placeholder="Enter Request ID"
            className="border p-2 rounded w-64"
          />
          <div className="space-x-2">
            <button
              onClick={() =>
                handleApiCall(financeApproveSettlement, { requestId })
              }
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Approve
            </button>
            <button
              onClick={() =>
                handleApiCall(financeRejectSettlement, { requestId })
              }
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Response box */}
      {message && (
        <div className="mt-6">
          <h3 className="font-semibold">API Response:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
            {message}
          </pre>
        </div>
      )}
    </div>
  );
}
 // 👈 import new API

// Add in your tab list:
{["teacher", "university", "referral", "finance", "pending"].map((tab) => ( ... ))}

// Add new section:
{activeTab === "pending" && (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">Pending Settlements</h2>
    <button
      onClick={async () => {
        try {
          const res = await getPendingSettlements();
          setMessage(JSON.stringify(res.data, null, 2));
        } catch (err) {
          setMessage(err.response?.data?.message || "Error fetching pending requests");
        }
      }}
      className="px-4 py-2 bg-purple-600 text-white rounded"
    >
      Fetch Pending Requests
    </button>
  </div>
)}
