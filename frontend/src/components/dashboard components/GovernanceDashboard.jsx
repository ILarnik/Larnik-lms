 import React, { useState, useEffect } from "react";
import { Download, Shield } from "lucide-react";
import {
  getMous,
  approveMou as apiApproveMou,
  rejectMou as apiRejectMou,
  downloadMouFile as apiDownloadMou,
} from "../../api/api"; // make sure these are exported from api.jsx

export default function GovernanceDashboard({ userRole = "Governance" }) {
  // Role-based access check
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
  const [remarkInput, setRemarkInput] = useState({});

  // Fetch MoUs from backend
  useEffect(() => {
    const fetchMous = async () => {
      try {
        const res = await getMous();
        console.log("MoUs API response:", res.data);

        // ✅ Ensure we always get an array
        const mouArray = Array.isArray(res.data.data) ? res.data.data : [];
        setDocuments(mouArray);
      } catch (err) {
        console.error("Failed to fetch MoUs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMous();
  }, []);

  // Map backend status to frontend
  const displayStatus = (status) => {
    if (status === "submitted") return "Pending";
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return status;
  };

  // Approve MoU
  const approveMoU = async (id) => {
    const remarks = remarkInput[id] || "";
    try {
      await apiApproveMou(id);
      setDocuments((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: "approved", governanceComment: remarks } : d
        )
      );
    } catch (err) {
      console.error("Failed to approve MoU:", err);
    }
  };

  // Reject MoU
  const rejectMoU = async (id) => {
    const remarks = remarkInput[id] || "";
    try {
      await apiRejectMou(id);
      setDocuments((prev) =>
        prev.map((d) =>
          d._id === id ? { ...d, status: "rejected", governanceComment: remarks } : d
        )
      );
    } catch (err) {
      console.error("Failed to reject MoU:", err);
    }
  };

  // Download MoU
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

  if (loading) return <p>Loading MoUs...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">🏛 Governance Dashboard</h2>

      <Section title="📑 MoU Validation">
        <table className="w-full text-left text-sm">
          <thead className="border-b bg-gray-50">
            <tr>
              <th className="p-2">Doc ID</th>
              <th className="p-2">University</th>
              <th className="p-2">Type</th>
              <th className="p-2">Date</th>
              <th className="p-2">Status</th>
              <th className="p-2">Remarks</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((d) => (
              <tr key={d._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{d._id}</td>
                <td className="p-2">{d.universityId?.name || "N/A"}</td>
                <td className="p-2">{d.type || "MoU"}</td>
                <td className="p-2">
                  {new Date(d.timestamps?.submittedAt || d.createdAt)
                    .toISOString()
                    .slice(0, 10)}
                </td>
                <td className="p-2">{displayStatus(d.status)}</td>
                <td className="p-2">
                  {displayStatus(d.status) === "Pending" ? (
                    <input
                      type="text"
                      placeholder="Add remarks..."
                      value={remarkInput[d._id] || ""}
                      onChange={(e) =>
                        setRemarkInput({ ...remarkInput, [d._id]: e.target.value })
                      }
                      className="border rounded px-2 py-1 text-sm w-full"
                    />
                  ) : (
                    d.governanceComment
                  )}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() =>
                      downloadMoU(d._id, `${d.universityId?.name || "MoU"}.pdf`)
                    }
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                  >
                    <Download size={14} /> Download
                  </button>
                  {displayStatus(d.status) === "Pending" && (
                    <>
                      <button
                        onClick={() => approveMoU(d._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectMoU(d._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}

// Section wrapper
function Section({ title, children }) {
  return (
    <div className="bg-white shadow rounded-xl p-4 mb-8">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}
