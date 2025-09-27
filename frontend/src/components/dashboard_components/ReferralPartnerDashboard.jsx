 // src/pages/ReferralPartnerDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  getReferralProfile,
  getMyReferrals,
  getMyEarnings,
  requestReferralSettlement,
  updateReferralProfile, // <-- new update API
} from "../../api/api";
import { toast } from "react-hot-toast";

const ReferralPartnerDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({});
  const [referrals, setReferrals] = useState([]);
  const [earnings, setEarnings] = useState({});
  const [loading, setLoading] = useState(true);
  const [settling, setSettling] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", password: "" });

  // Fetch partner profile
  const fetchProfile = async () => {
    try {
      const res = await getReferralProfile();
      setProfile(res.data);
      setEditForm({ name: res.data.name, password: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
    }
  };

  // Fetch referred students
  const fetchReferrals = async () => {
    try {
      const res = await getMyReferrals();
      setReferrals(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch referrals");
    }
  };

  // Fetch earnings
  const fetchEarnings = async () => {
    try {
      const res = await getMyEarnings();
      setEarnings(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch earnings");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchProfile(), fetchReferrals(), fetchEarnings()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Handle settlement request
  const handleSettlement = async () => {
    if (earnings.balance <= 0) {
      toast.error("No balance available for settlement");
      return;
    }
    try {
      setSettling(true);
      const res = await requestReferralSettlement();
      toast.success(res.data.message);
      fetchEarnings(); // refresh wallet
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Settlement failed");
    } finally {
      setSettling(false);
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      const res = await updateReferralProfile(editForm);
      toast.success(res.data.message || "Profile updated");
      fetchProfile();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

return (
  <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
    {/* Tabs */}
    <div className="flex flex-wrap gap-3 border-b mb-6">
      {["profile", "referrals", "earnings", "update"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`pb-2 px-3 font-semibold text-sm sm:text-base rounded-t-md focus:outline-none transition ${
            activeTab === tab
              ? "border-b-2 border-green-500 text-green-600"
              : "text-gray-600"
          }`}
        >
          {tab === "profile" && "Profile"}
          {tab === "referrals" && "Referrals"}
          {tab === "earnings" && "Earnings"}
          {tab === "update" && "Update Profile"}
        </button>
      ))}
    </div>

    {/* Profile Tab */}
    {activeTab === "profile" && (
      <div className="bg-white shadow p-4 sm:p-6 rounded-lg space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">My Profile</h2>
        <p>
          <strong>Name:</strong> {profile.name}
        </p>
        <p>
          <strong>Email:</strong> {profile.email}
        </p>
        <p>
          <strong>Referral Code:</strong> {profile.referralCode}
        </p>
        <p>
          <strong>Commission Rate:</strong> {profile.commissionPercent || 10}%
        </p>
        <p>
          <strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
    )}

    {/* Referrals Tab */}
    {activeTab === "referrals" && (
      <div className="bg-white shadow p-4 sm:p-6 rounded-lg overflow-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          My Referrals ({referrals.length})
        </h2>

        {referrals.length === 0 ? (
          <p className="text-gray-600">No referrals yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[520px]">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-sm sm:text-base">Name</th>
                  <th className="py-2 text-sm sm:text-base">Email</th>
                  <th className="py-2 text-sm sm:text-base">Joined</th>
                </tr>
              </thead>
              <tbody>
                {referrals.map((student) => (
                  <tr key={student._id} className="border-b">
                    <td className="py-2 text-sm sm:text-base">{student.name}</td>
                    <td className="py-2 text-sm sm:text-base break-words">{student.email}</td>
                    <td className="py-2 text-sm sm:text-base">
                      {new Date(student.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    )}

    {/* Earnings Tab */}
    {activeTab === "earnings" && (
      <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">My Earnings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
          <p>
            <strong>Referred Students:</strong> {earnings.referredCount}
          </p>
          <p>
            <strong>Commission Rate:</strong> {(earnings.rate || 0) * 100}%
          </p>
          <p>
            <strong>Total Revenue:</strong> ₹{(earnings.totalRevenue || 0).toFixed(2)}
          </p>
          <p>
            <strong>Wallet Balance:</strong> ₹{(earnings.balance || 0).toFixed(2)}
          </p>
        </div>

        <div className="mt-4">
          <button
            onClick={handleSettlement}
            disabled={settling}
            className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow disabled:opacity-60"
          >
            {settling ? "Requesting..." : "Request Settlement"}
          </button>
        </div>

        {/* Transactions */}
        <div className="mt-6 overflow-auto">
          <h3 className="text-lg font-semibold mb-2">Transactions</h3>
          {!(earnings.transactions && earnings.transactions.length) ? (
            <p>No transactions yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 text-sm sm:text-base">Date</th>
                    <th className="py-2 text-sm sm:text-base">Type</th>
                    <th className="py-2 text-sm sm:text-base">Amount</th>
                    <th className="py-2 text-sm sm:text-base">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {earnings.transactions.map((tx, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="py-2 text-sm sm:text-base">
                        {new Date(tx.date).toLocaleDateString()}
                      </td>
                      <td className="py-2 text-sm sm:text-base">{tx.type}</td>
                      <td className="py-2 text-sm sm:text-base">₹{Number(tx.amount || 0).toFixed(2)}</td>
                      <td className="py-2 text-sm sm:text-base">{tx.status || "credited"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    )}

    {/* Update Profile Tab */}
    {activeTab === "update" && (
      <div className="bg-white shadow p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-sm">Name</label>
            <input
              type="text"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-sm">Password</label>
            <input
              type="password"
              value={editForm.password}
              onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Leave blank to keep current"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={updating}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow disabled:opacity-60"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
);

};

export default ReferralPartnerDashboard;
