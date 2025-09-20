//  import React, { useState, useEffect } from "react";
// import { Download, Shield } from "lucide-react";
// import {
//   getMous,
//   approveMou as apiApproveMou,
//   rejectMou as apiRejectMou,
//   downloadMouFile as apiDownloadMou,
// } from "../../api/api"; // make sure these are exported from api.jsx

// export default function GovernanceDashboard({ userRole = "Governance" }) {
//   // Role-based access check
//   if (userRole !== "Governance") {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//         <Shield className="text-red-500 mb-2" size={48} />
//         <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
//         <p className="text-gray-500">
//           You don’t have permission to access the Governance Dashboard.
//         </p>
//       </div>
//     );
//   }

//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [remarkInput, setRemarkInput] = useState({});

//   // Fetch MoUs from backend
//   useEffect(() => {
//     const fetchMous = async () => {
//       try {
//         const res = await getMous();
//         console.log("MoUs API response:", res.data);

//         // ✅ Ensure we always get an array
//         const mouArray = Array.isArray(res.data.data) ? res.data.data : [];
//         setDocuments(mouArray);
//       } catch (err) {
//         console.error("Failed to fetch MoUs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMous();
//   }, []);

//   // Map backend status to frontend
//   const displayStatus = (status) => {
//     if (status === "submitted") return "Pending";
//     if (status === "approved") return "Approved";
//     if (status === "rejected") return "Rejected";
//     return status;
//   };

//   // Approve MoU
//   // const approveMoU = async (id) => {
//   //   const remarks = remarkInput[id] || "";
//   //   try {
//   //     await apiApproveMou(id);
//   //     setDocuments((prev) =>
//   //       prev.map((d) =>
//   //         d._id === id ? { ...d, status: "approved", governanceComment: remarks } : d
//   //       )
//   //     );
//   //   } catch (err) {
//   //     console.error("Failed to approve MoU:", err);
//   //   }
//   // };

//   // // Reject MoU
//   // const rejectMoU = async (id) => {
//   //   const remarks = remarkInput[id] || "";
//   //   try {
//   //     await apiRejectMou(id);
//   //     setDocuments((prev) =>
//   //       prev.map((d) =>
//   //         d._id === id ? { ...d, status: "rejected", governanceComment: remarks } : d
//   //       )
//   //     );
//   //   } catch (err) {
//   //     console.error("Failed to reject MoU:", err);
//   //   }
//   // };

// const approveMoU = async (id) => {
//   const remarks = remarkInput[id] || "";
//   try {
//     await apiApproveMou(id, { comment: remarks }); // ✅ send comment
//     setDocuments((prev) =>
//       prev.map((d) =>
//         d._id === id ? { ...d, status: "approved", governanceComment: remarks } : d
//       )
//     );
//   } catch (err) {
//     console.error("Failed to approve MoU:", err);
//   }
// };

// const rejectMoU = async (id) => {
//   const remarks = remarkInput[id] || "";
//   try {
//     await apiRejectMou(id, { comment: remarks }); // ✅ send comment
//     setDocuments((prev) =>
//       prev.map((d) =>
//         d._id === id ? { ...d, status: "rejected", governanceComment: remarks } : d
//       )
//     );
//   } catch (err) {
//     console.error("Failed to reject MoU:", err);
//   }
// };



//   // Download MoU
//   const downloadMoU = async (id, filename) => {
//     try {
//       const res = await apiDownloadMou(id, { responseType: "blob" });
//       const url = window.URL.createObjectURL(new Blob([res.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", filename || "mou.pdf");
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//     } catch (err) {
//       console.error("Failed to download MoU:", err);
//     }
//   };

//   if (loading) return <p>Loading MoUs...</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <h2 className="text-2xl font-bold mb-6">🏛 Governance Dashboard</h2>

//       <Section title="📑 MoU Validation">
//         <table className="w-full text-left text-sm">
//           <thead className="border-b bg-gray-50">
//             <tr>
//               <th className="p-2">Doc ID</th>
//               <th className="p-2">University</th>
//               <th className="p-2">Type</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Remarks</th>
//               <th className="p-2">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {documents.map((d) => (
//               <tr key={d._id} className="border-b hover:bg-gray-50">
//                 <td className="p-2">{d._id}</td>
//                 <td className="p-2">{d.universityId?.name || "N/A"}</td>
//                 <td className="p-2">{d.type || "MoU"}</td>
//                 <td className="p-2">
//                   {new Date(d.timestamps?.submittedAt || d.createdAt)
//                     .toISOString()
//                     .slice(0, 10)}
//                 </td>
//                 <td className="p-2">{displayStatus(d.status)}</td>
//                 <td className="p-2">
//                   {displayStatus(d.status) === "Pending" ? (
//                     <input
//                       type="text"
//                       placeholder="Add remarks..."
//                       value={remarkInput[d._id] || ""}
//                       onChange={(e) =>
//                         setRemarkInput({ ...remarkInput, [d._id]: e.target.value })
//                       }
//                       className="border rounded px-2 py-1 text-sm w-full"
//                     />
//                   ) : (
//                     d.governanceComment
//                   )}
//                 </td>
//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() =>
//                       downloadMoU(d._id, `${d.universityId?.name || "MoU"}.pdf`)
//                     }
//                     className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
//                   >
//                     <Download size={14} /> Download
//                   </button>
//                   {displayStatus(d.status) === "Pending" && (
//                     <>
//                       <button
//                         onClick={() => approveMoU(d._id)}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => rejectMoU(d._id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
//                       >
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </Section>
//     </div>
//   );
// }

// // Section wrapper
// function Section({ title, children }) {
//   return (
//     <div className="bg-white shadow rounded-xl p-4 mb-8">
//       <h3 className="text-xl font-semibold mb-4">{title}</h3>
//       {children}
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { Download, Shield, Eye, University, CheckCircle, XCircle, Clock, Star } from "lucide-react";
import {
  getMous,
  approveMou as apiApproveMou,
  rejectMou as apiRejectMou,
  downloadMouFile as apiDownloadMou,
} from "../../api/api";

export default function GovernanceDashboard({ userRole = "Governance" }) {
  if (userRole !== "Governance") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Shield className="text-red-500 mb-2" size={48} />
        <h2 className="text-xl font-bold text-gray-700">Access Denied</h2>
        <p className="text-gray-500">
          You don’t have permission to access the Governance Dashboard.
        </p>
      </div>
    );
  }

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalDoc, setModalDoc] = useState(null);
  const [remarkInput, setRemarkInput] = useState("");
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    const fetchMous = async () => {
      try {
        const res = await getMous();
        let mouArray = Array.isArray(res.data.data) ? res.data.data : [];

        // Sort latest first
        mouArray.sort(
          (a, b) =>
            new Date(b.timestamps?.submittedAt || b.createdAt) -
            new Date(a.timestamps?.submittedAt || a.createdAt)
        );

        setDocuments(mouArray);
      } catch (err) {
        console.error("Failed to fetch MoUs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMous();
  }, []);

  const displayStatus = (status) => {
    if (status === "submitted") return "Pending";
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return status;
  };

  const approveMoU = async (id) => {
    try {
      await apiApproveMou(id, { comment: remarkInput });
      setDocuments((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: "approved", governanceComment: remarkInput } : d
        )
      );
      setModalDoc(null);
      setRemarkInput("");
    } catch (err) {
      console.error("Failed to approve MoU:", err);
    }
  };

  const rejectMoU = async (id) => {
    try {
      await apiRejectMou(id, { comment: remarkInput });
      setDocuments((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: "rejected", governanceComment: remarkInput } : d
        )
      );
      setModalDoc(null);
      setRemarkInput("");
    } catch (err) {
      console.error("Failed to reject MoU:", err);
    }
  };

  const downloadMoU = async (id, filename) => {
    try {
      const res = await apiDownloadMou(id, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename || "mou.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Failed to download MoU:", err);
    }
  };

  if (loading)
    return <p className="text-green-800 font-semibold">Loading MoUs...</p>;

  // Stats calculations
  const total = documents.length;
  const pending = documents.filter((d) => displayStatus(d.status) === "Pending").length;
  const approved = documents.filter((d) => displayStatus(d.status) === "Approved").length;
  const rejected = documents.filter((d) => displayStatus(d.status) === "Rejected").length;
  const newThisMonth = documents.filter((d) => {
    const date = new Date(d.timestamps?.submittedAt || d.createdAt);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;

  const filteredDocs = documents.filter((d) => displayStatus(d.status) === activeTab);

  return (
    <div className="p-6 bg-green-50 min-h-screen space-y-6">
      <h2 className="text-3xl font-bold text-green-800 mb-4">🏛 Governance Dashboard</h2>

      {/* Top Elevated Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <DashboardCard
          title="Total Universities"
          count={total}
          subtitle="All registered universities"
          icon={<University size={24} className="text-green-600" />}
        />
        <DashboardCard
          title="Active Universities"
          count={approved}
          subtitle="Currently active"
          icon={<CheckCircle size={24} className="text-green-500" />}
        />
        <DashboardCard
          title="Pending Universities"
          count={pending}
          subtitle="Awaiting approval"
          icon={<Clock size={24} className="text-yellow-500" />}
        />
        <DashboardCard
          title="Rejected Universities"
          count={rejected}
          subtitle="Not approved"
          icon={<XCircle size={24} className="text-red-500" />}
        />
        <DashboardCard
          title="New This Month"
          count={newThisMonth}
          subtitle="Joined this month"
          icon={<Star size={24} className="text-blue-500" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        {["Pending", "Approved", "Rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl font-semibold shadow-md transition
              ${
                activeTab === tab
                  ? tab === "Approved"
                    ? "bg-green-500 text-white"
                    : tab === "Rejected"
                    ? "bg-red-500 text-white"
                    : "bg-yellow-400 text-white"
                  : "bg-white text-gray-700 border border-gray-300"
              }`}
          >
            {tab} ({documents.filter((d) => displayStatus(d.status) === tab).length})
          </button>
        ))}
      </div>

      {/* MoU Cards */}
      <div className="space-y-4 max-h-[65vh] overflow-y-auto">
        {filteredDocs.length === 0 && (
          <p className="text-gray-600">No {activeTab.toLowerCase()} documents.</p>
        )}

        {filteredDocs.map((d) => (
          <div
            key={d._id}
            className="bg-white rounded-2xl shadow-lg p-4 border-l-4 border-green-400 flex flex-col md:flex-row justify-between gap-4"
          >
            <div className="flex-1 space-y-1">
              <p className="text-sm text-green-700 font-medium">
                <span className="font-semibold">Doc ID:</span> {d._id}
              </p>
              <p className="text-sm text-green-700 font-medium">
                <span className="font-semibold">University:</span> {d.universityId?.name || "N/A"}
              </p>
              <p className="text-sm text-green-700 font-medium">
                <span className="font-semibold">Type:</span> {d.type || "MoU"}
              </p>
              <p className="text-sm text-green-700 font-medium">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(d.timestamps?.submittedAt || d.createdAt).toISOString().slice(0, 10)}
              </p>
              <p className="text-sm font-medium">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`${
                    displayStatus(d.status) === "Approved"
                      ? "text-green-600"
                      : displayStatus(d.status) === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {displayStatus(d.status)}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => downloadMoU(d._id, `${d.universityId?.name || "MoU"}.pdf`)}
                className="bg-blue-500 text-white px-3 py-1 rounded-xl flex items-center gap-1 text-sm shadow-sm"
              >
                <Download size={14} /> Download
              </button>

              {displayStatus(d.status) === "Pending" && (
                <button
                  onClick={() => {
                    setModalDoc(d);
                    setRemarkInput(d.governanceComment || "");
                  }}
                  className="bg-indigo-500 text-white px-3 py-1 rounded-xl flex items-center gap-1 text-sm shadow-sm"
                >
                  <Eye size={14} /> View
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl p-6 shadow-lg relative flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-green-800">
              Viewing MoU: {modalDoc.universityId?.name || "MoU"}
            </h3>

            {/* PDF Embed */}
            <div className="border rounded-xl overflow-hidden mb-4 h-96">
              <iframe
                src={URL.createObjectURL(
                  new Blob([modalDoc.fileData], { type: "application/pdf" })
                )}
                title="MoU Document"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Remarks */}
            <textarea
              placeholder="Add remarks here..."
              value={remarkInput}
              onChange={(e) => setRemarkInput(e.target.value)}
              className="w-full border border-green-300 rounded-xl px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-end gap-3">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-xl shadow-md"
                onClick={() => approveMoU(modalDoc._id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-md"
                onClick={() => rejectMoU(modalDoc._id)}
              >
                Reject
              </button>
              <button
                className="px-4 py-2 rounded-xl border border-gray-300"
                onClick={() => setModalDoc(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard stats card
function DashboardCard({ title, count, subtitle, icon }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-lg flex flex-col items-start justify-center gap-2 hover:shadow-2xl transition">
      <div className="flex items-center gap-3">{icon}<p className="text-lg font-semibold">{title}</p></div>
      <p className="text-3xl font-bold text-gray-800">{count}</p>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
}
