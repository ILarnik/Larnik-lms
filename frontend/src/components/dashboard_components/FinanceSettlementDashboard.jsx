//  import React, { useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode"; // ✅ correct import
// import UniversitySettlement from "../../pages/UniversitySettlement.jsx";
// import FinanceManager from "../../pages/FinanceManager.jsx";

// export default function FinanceSettlementDashboard() {
//   const [activeTab, setActiveTab] = useState("university");
//   const [userRole, setUserRole] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         console.log("🔍 Full decoded token:", decoded);

//         // Normalize roles
//         let roleFromToken =
//           decoded.role || decoded.roles?.[0] || decoded.userRole;

//         // Special handling for finance managers
//         if (decoded.role === "sub-admin" && decoded.subAdminRole === "finance_manager") {
//           roleFromToken = "finance";
//         }

//         const idFromToken = decoded.id || decoded.userId || decoded._id;

//         setUserRole(roleFromToken);
//         setUserId(idFromToken);

//         localStorage.setItem("role", roleFromToken);
//         localStorage.setItem("userId", idFromToken);

//         console.log("✅ Normalized Role/UserId:", roleFromToken, idFromToken);
//       } catch (err) {
//         console.error("❌ Failed to decode token:", err);
//       }
//     } else {
//       console.warn("⚠️ No token found in localStorage");
//     }
//     setLoading(false);
//   }, []);

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "university":
//         if (userRole !== "university") {
//           return <p className="text-red-600">⚠️ Only university users can access this section</p>;
//         }
//         return <UniversitySettlement universityId={userId} />;

//       case "finance":
//         if (userRole !== "finance") {
//           return <p className="text-red-600">⚠️ Only finance managers can access this section</p>;
//         }
//         // Pass ownerType as "teacher" to fetch teacher wallets by default
//         return <FinanceManager walletOwnerId={userId} ownerType="teacher" />;

//       default:
//         return null;
//     }
//   };

//   if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;

//   return (
//     <div className="p-4 max-w-5xl mx-auto bg-gray-50">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         Finance & Settlement Dashboard
//       </h1>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6 justify-center">
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "university" ? "bg-green-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("university")}
//         >
//           University
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             activeTab === "finance" ? "bg-purple-600 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => setActiveTab("finance")}
//         >
//           Finance Manager
//         </button>
//       </div>

//       <div>{renderTabContent()}</div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from "react";
// import { Card, CardContent } from "../ui/card";
// import { Button } from "../ui/button";
// import { CheckCircle2, Clock, Wallet } from "lucide-react";

// // import {
// //   getFinanceOverview,
// //   getSettlements,
// //   requestWithdrawal,
// // } from "../../api/api";

// export default function FinanceSettlementDashboard() {
//   const [overview, setOverview] = useState(null);
//   const [settlements, setSettlements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [withdrawLoading, setWithdrawLoading] = useState(false);

//   // Fetch overview and settlements on load
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [overviewRes, settlementsRes] = await Promise.all([
//           getFinanceOverview(),
//           getSettlements(),
//         ]);
//         setOverview(overviewRes.data);
//         setSettlements(settlementsRes.data.settlements || []);
//       } catch (err) {
//         console.error("Error fetching finance data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleWithdrawal = async () => {
//     if (!overview || overview.balance <= 0) {
//       alert("No balance available for withdrawal.");
//       return;
//     }

//     try {
//       setWithdrawLoading(true);
//       await requestWithdrawal();
//       alert("Withdrawal request submitted successfully!");
//       // Refresh data
//       const [overviewRes, settlementsRes] = await Promise.all([
//         getFinanceOverview(),
//         getSettlements(),
//       ]);
//       setOverview(overviewRes.data);
//       setSettlements(settlementsRes.data.settlements || []);
//     } catch (err) {
//       console.error("Withdrawal failed:", err);
//       alert("Withdrawal failed, please try again.");
//     } finally {
//       setWithdrawLoading(false);
//     }
//   };

//   if (loading) {
//     return <p className="text-center py-6 text-gray-500">Loading finance data...</p>;
//   }

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold text-green-800">Finance & Settlements</h1>

//       {/* Overview Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         <Card className="shadow-md border border-green-200">
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-gray-500">Total Earnings</p>
//               <h2 className="text-xl font-bold text-green-700">
//                 ₹{overview?.totalEarnings || 0}
//               </h2>
//             </div>
//             <Wallet className="h-10 w-10 text-green-600" />
//           </CardContent>
//         </Card>

//         <Card className="shadow-md border border-green-200">
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-gray-500">Pending Settlements</p>
//               <h2 className="text-xl font-bold text-yellow-600">
//                 ₹{overview?.pendingSettlements || 0}
//               </h2>
//             </div>
//             <Clock className="h-10 w-10 text-yellow-500" />
//           </CardContent>
//         </Card>

//         <Card className="shadow-md border border-green-200">
//           <CardContent className="flex items-center justify-between p-6">
//             <div>
//               <p className="text-sm text-gray-500">Available Balance</p>
//               <h2 className="text-xl font-bold text-green-700">
//                 ₹{overview?.balance || 0}
//               </h2>
//             </div>
//             <CheckCircle2 className="h-10 w-10 text-green-500" />
//           </CardContent>
//         </Card>
//       </div>

//       {/* Withdrawal Button */}
//       <div className="flex justify-end">
//         <Button
//           onClick={handleWithdrawal}
//           disabled={withdrawLoading || !overview || overview.balance <= 0}
//           className="bg-green-600 hover:bg-green-700 text-white"
//         >
//           {withdrawLoading ? "Processing..." : "Request Withdrawal"}
//         </Button>
//       </div>

//       {/* Settlement History */}
//       <Card className="shadow-md border border-green-200">
//         <CardContent className="p-6">
//           <h2 className="text-lg font-semibold text-green-800 mb-4">
//             Settlement History
//           </h2>
//           {settlements.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full text-sm text-left border">
//                 <thead className="bg-green-50 text-green-900">
//                   <tr>
//                     <th className="px-4 py-2 border">Date</th>
//                     <th className="px-4 py-2 border">Amount</th>
//                     <th className="px-4 py-2 border">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {settlements.map((s, idx) => (
//                     <tr key={idx} className="hover:bg-green-50">
//                       <td className="px-4 py-2 border">
//                         {new Date(s.date).toLocaleDateString()}
//                       </td>
//                       <td className="px-4 py-2 border">₹{s.amount}</td>
//                       <td className="px-4 py-2 border">
//                         <span
//                           className={`px-2 py-1 rounded text-xs font-medium ${
//                             s.status === "completed"
//                               ? "bg-green-100 text-green-700"
//                               : "bg-yellow-100 text-yellow-700"
//                           }`}
//                         >
//                           {s.status}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p className="text-gray-500 text-sm">No settlements found.</p>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
// import { getPendingSettlements, financeApproveSettlement, financeRejectSettlement } from "../../api/api";
import { getPendingSettlements, financeApproveSettlement, financeRejectSettlement } from "../../api/api";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "react-toastify";

const FinanceSettlementDashboard = () => {
  const [settlements, setSettlements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [split, setSplit] = useState({ teacher: 0, university: 0, platform: 0 });

  useEffect(() => {
    fetchSettlements();
  }, []);

  const fetchSettlements = async () => {
    setLoading(true);
    try {
      const res = await getPendingSettlements();
      if (res.success) setSettlements(res.wallets);
    } catch (err) {
      toast.error("Failed to fetch settlements");
    }
    setLoading(false);
  };

  const handleApprove = async (walletOwnerId, transactionId) => {
    try {
      const res = await financeApproveSettlement({ walletOwnerId, transactionId, split });
      if (res.success) {
        toast.success("Settlement approved!");
        fetchSettlements();
      }
    } catch (err) {
      toast.error("Approval failed");
    }
  };

  const handleReject = async (walletOwnerId, transactionId) => {
    try {
      const res = await financeRejectSettlement({ walletOwnerId, transactionId });
      if (res.success) {
        toast.info("Settlement rejected");
        fetchSettlements();
      }
    } catch (err) {
      toast.error("Rejection failed");
    }
  };

  if (loading) return <p>Loading settlements...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Finance Settlements</h2>
      {settlements.length === 0 ? (
        <p>No pending settlements</p>
      ) : (
        settlements.map((wallet) =>
          wallet.transactions
            .filter((tx) => tx.status === "pending")
            .map((tx) => (
              <Card key={tx._id} className="mb-4 shadow-md">
                <CardContent>
                  <p><strong>Owner:</strong> {wallet?.ownerId?.name} ({wallet?.ownerId?.role})</p>
                  <p><strong>Student:</strong> {tx?.studentId?.name} ({tx?.studentId?.email})</p>
                  <p><strong>Course:</strong> {tx?.courseId?.title} - ₹{tx?.amount}</p>
                  <div className="flex gap-2 mt-2">
                    <Input
                      type="number"
                      placeholder="Teacher Share"
                      value={split.teacher}
                      onChange={(e) => setSplit({ ...split, teacher: Number(e.target.value) })}
                    />
                    <Input
                      type="number"
                      placeholder="University Share"
                      value={split.university}
                      onChange={(e) => setSplit({ ...split, university: Number(e.target.value) })}
                    />
                    <Input
                      type="number"
                      placeholder="Platform Share"
                      value={split.platform}
                      onChange={(e) => setSplit({ ...split, platform: Number(e.target.value) })}
                    />
                  </div>
                  <div className="flex gap-4 mt-3">
                    <Button onClick={() => handleApprove(wallet.ownerId._id || wallet._id, tx._id)}>
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleReject(wallet.ownerId._id || wallet._id, tx._id)}
                    >
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
        )
      )}
    </div>
  );
};

export default FinanceSettlementDashboard;
