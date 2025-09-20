//  import React, { useEffect, useState } from "react";
// import { approveSettlement, rejectSettlement, getPendingSettlements } from "../api/api.jsx";

// export default function FinanceManager() {
//   const [wallets, setWallets] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [approving, setApproving] = useState(false);
//   const [split, setSplit] = useState({ teacher: 100, university: 0, platform: 0 });

//   // Utility: Get correct ownerId based on wallet type
 
// // const getOwnerId = (wallet) => {
// //   switch (wallet.ownerType) {
// //     case "teacher":
// //       return wallet.teacherId?._id || wallet.teacherId;
// //     case "university":
// //       return wallet.universityId?._id || wallet.universityId;
// //     case "referral":
// //       return wallet.referralId?._id || wallet.referralId;
// //     default:
// //       return wallet.ownerId || wallet._id; // fallback
// //   }
// // };
// const getOwnerId = (wallet) => {
//   switch (wallet.ownerType) {
//     case "teacher":
//       return wallet.teacherId?._id || wallet.teacherId;
//     case "university":
//       return wallet.universityId?._id || wallet.universityId;
//     case "referral":
//       return wallet._id; // <-- use wallet's own _id
//     default:
//       return wallet.ownerId || wallet._id;
//   }
// };




//   // Fetch all pending settlements
//   const fetchPending = async () => {
//     try {
//       setLoading(true);
//       const { data } = await getPendingSettlements();
//       setWallets(data.wallets || []);
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Failed to fetch pending settlements");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Approve settlement
//   const handleApprove = async (wallet, transaction) => {
//     const ownerId = getOwnerId(wallet);

//     // Validate ownerId
//     if (!ownerId || !/^[0-9a-fA-F]{24}$/.test(ownerId)) {
//       alert("Invalid owner ID. Cannot approve.");
//       return;
//     }

//     if (split.teacher + split.university + split.platform > 100) {
//       alert("Split percentages cannot exceed 100%");
//       return;
//     }

//     try {
//       setApproving(true);
//       await approveSettlement({
//         walletOwnerId: ownerId,
//         transactionId: transaction._id,
//         split,
//       });
//       fetchPending(); // refresh after approval
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Approval failed");
//     } finally {
//       setApproving(false);
//     }
//   };

 
//   // const handleReject = async (wallet, transaction) => {
//   //   const ownerId = getOwnerId(wallet);

//   //   // Validate ownerId
//   //   if (!ownerId || !/^[0-9a-fA-F]{24}$/.test(ownerId)) {
//   //     alert("Invalid owner ID. Cannot reject.");
//   //     return;
//   //   }

//   //   try {
//   //     setApproving(true);
//   //     await rejectSettlement({ walletOwnerId: ownerId, transactionId: transaction._id });
//   //     fetchPending(); // refresh after rejection
//   //   } catch (err) {
//   //     console.error(err);
//   //     alert(err.response?.data?.message || "Rejection failed");
//   //   } finally {
//   //     setApproving(false);
//   //   }
//   // };
//   // Reject settlement
// // const handleReject = async (wallet, transaction) => {
// //   const ownerId = getOwnerId(wallet);

// //   // ❌ Remove strict ObjectId validation
// //   if (!ownerId) {
// //     alert("Invalid owner ID. Cannot reject.");
// //     return;
// //   }

// //   try {
// //     setApproving(true);
// //     await rejectSettlement({ walletOwnerId: ownerId, transactionId: transaction._id });
// //     fetchPending(); // refresh after rejection
// //   } catch (err) {
// //     console.error(err);
// //     alert(err.response?.data?.message || "Rejection failed");
// //   } finally {
// //     setApproving(false);
// //   }
// // };
// const handleReject = async (wallet, transaction) => {
//   const ownerId = getOwnerId(wallet);

//   if (!ownerId) {
//     alert("Invalid owner ID. Cannot reject.");
//     return;
//   }

//   try {
//     setApproving(true);
//     await rejectSettlement({ walletOwnerId: ownerId, transactionId: transaction._id });
//     fetchPending(); // refresh after rejection
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || "Rejection failed");
//   } finally {
//     setApproving(false);
//   }
// };


//   useEffect(() => {
//     fetchPending();
//   }, []);

//   if (loading) return <p>Loading pending settlements...</p>;
//   if (!wallets.length) return <p>No pending settlements</p>;

//   return (
//     <div className="p-4 max-w-3xl mx-auto bg-white shadow rounded">
//       <h2 className="text-xl font-bold mb-4">Finance Manager Approvals</h2>

//       {wallets.map((wallet) =>
//         wallet.transactions
//           .filter((t) => t.status === "pending")
//           .map((t) => (
//             <div key={t._id} className="border p-3 rounded mb-3">
//               <p>
//                 <strong>Wallet Owner:</strong> {wallet.ownerId?.name || wallet.ownerType || "Unknown"} ({wallet.ownerType})
//               </p>
//               <p><strong>Amount:</strong> ₹{t.amount}</p>
//               <p><strong>Note:</strong> {t.note}</p>

//               <div className="flex gap-2 my-2">
//                 <input
//                   type="number"
//                   placeholder="Teacher %"
//                   value={split.teacher}
//                   onChange={(e) => setSplit({ ...split, teacher: Number(e.target.value) })}
//                   className="border p-1 w-1/3"
//                 />
//                 <input
//                   type="number"
//                   placeholder="University %"
//                   value={split.university}
//                   onChange={(e) => setSplit({ ...split, university: Number(e.target.value) })}
//                   className="border p-1 w-1/3"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Platform %"
//                   value={split.platform}
//                   onChange={(e) => setSplit({ ...split, platform: Number(e.target.value) })}
//                   className="border p-1 w-1/3"
//                 />
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   className="bg-green-600 text-white px-4 py-2 rounded"
//                   onClick={() => handleApprove(wallet, t)}
//                   disabled={approving}
//                 >
//                   Approve
//                 </button>
//                 <button
//                   className="bg-red-600 text-white px-4 py-2 rounded"
//                   onClick={() => handleReject(wallet, t)}
//                   disabled={approving}
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))
//       )}
//     </div>
//   );
// }
