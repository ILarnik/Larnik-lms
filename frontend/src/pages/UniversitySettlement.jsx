 import React, { useEffect, useState } from "react";
import {
  universityApproveSettlement,
  getWallet,
  getTeachers,
} from "../api/api.jsx";

export default function UniversitySettlement({ universityId }) {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [approving, setApproving] = useState(false);
  const [teacherShare, setTeacherShare] = useState(0);

  // ✅ Fetch all teachers for dropdown
  const fetchTeachers = async () => {
    try {
      const { data } = await getTeachers(universityId);
      setTeachers(data || []);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to load teachers");
    }
  };

  // ✅ Fetch wallet for selected teacher
  const fetchWallet = async () => {
    if (!selectedTeacherId) return; // 🚨 stop if no teacher is selected
    try {
      setLoading(true);
      const { data } = await getWallet(selectedTeacherId);
      setWallet(data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to fetch wallet");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Approve settlement
  const handleApprove = async (transactionId) => {
    if (!selectedTeacherId) {
      alert("Please select a teacher first");
      return;
    }
    try {
      setApproving(true);
      const { data } = await universityApproveSettlement({
        teacherId: selectedTeacherId,
        transactionId,
        teacherShare,
      });
      alert(data.message);
      fetchWallet(); // reload after approve
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setApproving(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (selectedTeacherId) {
      fetchWallet();
    } else {
      setWallet(null); // reset when deselect
    }
  }, [selectedTeacherId]);

  const pendingTransactions =
    wallet?.transactions?.filter(
      (t) =>
        t.status === "pending_university" && t.type === "settlement_request"
    ) || [];

return (
  <div className="p-4 sm:p-6 max-w-xl mx-auto bg-white/90 backdrop-blur-sm shadow-lg rounded-xl">
    <h2 className="text-lg sm:text-xl font-bold mb-4 text-emerald-700">
      University Settlement
    </h2>

    {/* Teacher selection dropdown */}
    <div className="mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        Select Teacher
      </label>
      <select
        className="border border-gray-300 p-2 w-full rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
        value={selectedTeacherId}
        onChange={(e) => setSelectedTeacherId(e.target.value)}
      >
        <option value="">-- Select Teacher --</option>
        {teachers.map((teacher) => (
          <option key={teacher._id} value={teacher._id}>
            {teacher.name}
          </option>
        ))}
      </select>
    </div>

    {/* Wallet + Pending Transactions */}
    {loading && <p className="text-gray-600">Loading wallet...</p>}

    {!loading && selectedTeacherId && (
      <>
        {pendingTransactions.length === 0 ? (
          <p className="text-sm text-gray-600">No pending settlements</p>
        ) : (
          pendingTransactions.map((t) => (
            <div
              key={t._id}
              className="border border-gray-200 bg-gray-50 p-4 rounded-lg mb-4 shadow-sm"
            >
              <p className="text-gray-700">
                <strong>Amount:</strong> ₹{t.amount}
              </p>
              <p className="text-gray-700">
                <strong>Note:</strong> {t.note}
              </p>
              <input
                type="number"
                placeholder="Teacher Share"
                className="border border-gray-300 p-2 mt-3 mb-3 w-full rounded-lg focus:ring-2 focus:ring-emerald-400 outline-none"
                value={teacherShare}
                onChange={(e) => setTeacherShare(Number(e.target.value))}
              />
              <button
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-green-600 text-white px-5 py-2 rounded-lg shadow hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => handleApprove(t._id)}
                disabled={approving}
              >
                {approving ? "Approving..." : "Approve Settlement"}
              </button>
            </div>
          ))
        )}
      </>
    )}
  </div>
);

}
