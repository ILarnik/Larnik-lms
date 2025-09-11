 import React, { useEffect, useState } from "react";
import { approveSettlement, getWallet } from "../api/api.jsx";

export default function FinanceManager({ walletOwnerId }) {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [platformShare, setPlatformShare] = useState(0);

  const fetchWallet = async () => {
    if (!walletOwnerId) {
      console.warn("⚠️ No walletOwnerId provided");
      return; // 🚨 stop API call if null/undefined
    }
    try {
      setLoading(true);
      console.log("Fetching wallet for:", walletOwnerId);

      const { data } = await getWallet(walletOwnerId);
      console.log("Wallet data fetched:", data);

      setWallet(data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (transactionId) => {
    if (!walletOwnerId) {
      alert("⚠️ No wallet owner selected");
      return;
    }
    try {
      setApproving(true);
      const { data } = await approveSettlement({
        walletOwnerId,
        transactionId,
        platformShare,
      });
      alert(data.message);
      fetchWallet();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setApproving(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, [walletOwnerId]); // re-fetch when owner changes

  const pendingTransactions =
    wallet?.transactions?.filter(
      (t) => t.status === "pending" && t.type === "settlement_request"
    ) || [];

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Finance Manager Approvals</h2>

      {!walletOwnerId ? (
        <p className="text-red-600">⚠️ No wallet owner selected</p>
      ) : loading ? (
        <p>Loading wallet...</p>
      ) : pendingTransactions.length === 0 ? (
        <p>No pending settlements</p>
      ) : (
        pendingTransactions.map((t) => (
          <div key={t._id} className="border p-3 rounded mb-3">
            <p>
              <strong>Wallet Owner:</strong> {walletOwnerId}
            </p>
            <p>
              <strong>Amount:</strong> ₹{t.amount}
            </p>
            <p>
              <strong>Note:</strong> {t.note}
            </p>
            <input
              type="number"
              placeholder="Platform Share"
              className="border p-1 mt-2 mb-2 w-full"
              value={platformShare}
              onChange={(e) => setPlatformShare(Number(e.target.value))}
            />
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => handleApprove(t._id)}
              disabled={approving}
            >
              {approving ? "Approving..." : "Approve Settlement"}
            </button>
          </div>
        ))
      )}
    </div>
  );
}
