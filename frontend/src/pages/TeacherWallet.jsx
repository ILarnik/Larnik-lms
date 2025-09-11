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
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Teacher Wallet</h2>
      <p className="mb-2">Balance: ₹{wallet?.balance || 0}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleRequestSettlement}
        disabled={requesting}
      >
        {requesting ? "Requesting..." : "Request Settlement"}
      </button>

      <h3 className="mt-6 font-semibold">Transactions</h3>
      <ul className="mt-2 space-y-2">
        {wallet?.transactions?.map((t) => (
          <li key={t._id} className="p-2 border rounded">
            <p>Type: {t.type}</p>
            <p>Amount: ₹{t.amount}</p>
            <p>Status: {t.status}</p>
            <p>Note: {t.note}</p>
            <p>Date: {new Date(t.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
