 import React, { useEffect, useState } from "react";
import { getWallet, requestSettlement } from "../api/api.jsx";

export default function TeacherWallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);

  // ✅ Fetch teacher ID from localStorage (or context)
  const teacherId = localStorage.getItem("userId");

  const fetchWallet = async () => {
    if (!teacherId) {
      console.warn("⚠️ No teacherId found in localStorage");
      setLoading(false);
      return; // 🚨 prevent API call with null
    }

    try {
      setLoading(true);
      const { data } = await getWallet(teacherId);
      setWallet(data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSettlement = async () => {
    if (!teacherId) {
      alert("⚠️ No teacherId found");
      return;
    }

    if (!wallet || wallet.balance <= 0) {
      alert("No balance to request payout");
      return;
    }

    try {
      setRequesting(true);
      const { data } = await requestSettlement(teacherId);
      alert(data.message);
      fetchWallet();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to request settlement");
    } finally {
      setRequesting(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  if (!teacherId) {
    return (
      <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Teacher Wallet</h2>
        <p className="text-red-600">⚠️ No teacher logged in</p>
      </div>
    );
  }

  if (loading) return <div>Loading wallet...</div>;

 return (
  <div className="p-4 sm:p-6 max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg rounded-xl">
    <h2 className="text-lg sm:text-xl font-bold mb-4 text-emerald-700">
      Teacher Wallet
    </h2>

    <p className="mb-2 text-gray-700 font-medium">
      Balance:{" "}
      <span className="text-lg font-bold text-gray-900">
        ₹{wallet?.balance || 0}
      </span>
    </p>

    <button
      className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
      onClick={handleRequestSettlement}
      disabled={requesting}
    >
      {requesting ? "Requesting..." : "Request Settlement"}
    </button>

    <h3 className="mt-6 font-semibold text-gray-800">Transactions</h3>
    {wallet?.transactions?.length > 0 ? (
      <ul className="mt-3 space-y-3">
        {wallet.transactions.map((t) => (
          <li
            key={t._id}
            className="p-3 border border-gray-200 rounded-lg bg-gray-50 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Type:</span> {t.type}
              </p>
              <p
                className={`text-xs font-semibold mt-1 sm:mt-0 px-2 py-0.5 rounded-full ${
                  t.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : t.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {t.status}
              </p>
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Amount:</span> ₹{t.amount}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-medium">Note:</span> {t.note}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(t.date).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="mt-3 text-sm text-gray-500">No transactions yet.</p>
    )}
  </div>
);

}
