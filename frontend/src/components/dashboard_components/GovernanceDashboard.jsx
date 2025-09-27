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
  <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 text-center">
    <Shield className="text-red-500 mb-4" size={56} />
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
      Access Denied
    </h2>
    <p className="mt-2 text-gray-500 max-w-md text-sm sm:text-base">
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
    return (
  <p className="text-green-800 font-semibold text-center px-4 py-2 text-sm sm:text-base">
    Loading MoUs...
  </p>
);


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
  <div className="p-4 sm:p-6 lg:p-10 min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    {/* Page Header */}
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-green-800 text-center">
        🏛 Governance Dashboard
      </h2>

      {/* Top Elevated Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <DashboardCard
          title="Total Universities"
          count={total}
          subtitle="All registered universities"
          icon={<University size={20} className="text-green-600" />}
        />
        <DashboardCard
          title="Active Universities"
          count={approved}
          subtitle="Currently active"
          icon={<CheckCircle size={20} className="text-green-500" />}
        />
        <DashboardCard
          title="Pending Universities"
          count={pending}
          subtitle="Awaiting approval"
          icon={<Clock size={20} className="text-yellow-500" />}
        />
        <DashboardCard
          title="Rejected Universities"
          count={rejected}
          subtitle="Not approved"
          icon={<XCircle size={20} className="text-red-500" />}
        />
        <DashboardCard
          title="New This Month"
          count={newThisMonth}
          subtitle="Joined this month"
          icon={<Star size={20} className="text-blue-500" />}
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-3">
        {["Pending", "Approved", "Rejected"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-3 sm:px-4 py-2 rounded-xl font-semibold shadow-sm transition text-sm sm:text-base
              ${
                activeTab === t
                  ? t === "Approved"
                    ? "bg-green-600 text-white shadow-lg"
                    : t === "Rejected"
                    ? "bg-red-600 text-white shadow-lg"
                    : "bg-yellow-500 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:scale-105"
              }`}
          >
            {t} ({documents.filter((d) => displayStatus(d.status) === t).length})
          </button>
        ))}
      </div>

      {/* MoU Cards container */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-4 sm:p-6 max-w-7xl mx-auto">
        {filteredDocs.length === 0 ? (
          <p className="text-center text-gray-600 py-8">
            No {activeTab.toLowerCase()} documents.
          </p>
        ) : (
          <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
            {filteredDocs.map((d) => (
              <div
                key={d._id}
                className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-green-400 flex flex-col md:flex-row justify-between gap-4"
              >
                <div className="flex-1 space-y-1">
                  <p className="text-sm text-green-700 font-medium">
                    <span className="font-semibold">Doc ID:</span> {d._id}
                  </p>

                  <p className="text-sm text-green-700 font-medium">
                    <span className="font-semibold">University:</span>{" "}
                    {d.universityId?.name || "N/A"}
                  </p>

                  <p className="text-sm text-green-700 font-medium">
                    <span className="font-semibold">Type:</span> {d.type || "MoU"}
                  </p>

                  <p className="text-sm text-green-700 font-medium">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(d.timestamps?.submittedAt || d.createdAt)
                      .toISOString()
                      .slice(0, 10)}
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

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <button
                    onClick={() =>
                      downloadMoU(d._id, `${d.universityId?.name || "MoU"}.pdf`)
                    }
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-xl text-sm shadow-sm hover:bg-blue-600"
                  >
                    <Download size={14} /> Download
                  </button>

                  {displayStatus(d.status) === "Pending" && (
                    <button
                      onClick={() => {
                        setModalDoc(d);
                        setRemarkInput(d.governanceComment || "");
                      }}
                      className="inline-flex items-center gap-2 bg-indigo-500 text-white px-3 py-2 rounded-xl text-sm shadow-sm hover:bg-indigo-600"
                    >
                      <Eye size={14} /> View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    {/* Modal */}
    {modalDoc && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl w-full max-w-3xl p-4 sm:p-6 shadow-lg overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h3 className="text-lg sm:text-xl font-bold text-green-800">
              Viewing MoU: {modalDoc.universityId?.name || "MoU"}
            </h3>
            <button
              onClick={() => setModalDoc(null)}
              className="text-gray-500 hover:text-gray-700 rounded p-1"
              aria-label="Close modal"
            >
              ✖
            </button>
          </div>

          {/* PDF Embed (responsive) */}
          <div className="border rounded-xl overflow-hidden mb-4 h-60 sm:h-80">
            {/* Use src from modalDoc.fileUrl if you have a URL; fallback uses blob as before */}
            {modalDoc.fileUrl ? (
              <iframe
                src={modalDoc.fileUrl}
                title="MoU Document"
                className="w-full h-full"
              />
            ) : (
              <iframe
                src={
                  modalDoc.fileData
                    ? URL.createObjectURL(
                        new Blob([modalDoc.fileData], { type: "application/pdf" })
                      )
                    : ""
                }
                title="MoU Document"
                className="w-full h-full"
              />
            )}
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
              className="px-4 py-2 rounded-xl bg-green-500 text-white shadow-md"
              onClick={() => approveMoU(modalDoc._id)}
            >
              Approve
            </button>
            <button
              className="px-4 py-2 rounded-xl bg-red-500 text-white shadow-md"
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
  <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col items-start justify-center gap-2 hover:shadow-2xl transition w-full">
    {/* Icon + Title */}
    <div className="flex items-center gap-2 sm:gap-3">
      {icon}
      <p className="text-base sm:text-lg font-semibold">{title}</p>
    </div>

    {/* Count */}
    <p className="text-2xl sm:text-3xl font-bold text-gray-800 break-words">
      {count}
    </p>

    {/* Subtitle */}
    <p className="text-gray-500 text-xs sm:text-sm">{subtitle}</p>
  </div>
);

}
