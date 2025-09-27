// src/components/UniversityDashboard.jsx
import React, { useState, useEffect } from "react";
import { Users, BookOpen, Award, FileText, BarChart, DollarSign } from "lucide-react";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode"; // ✅ Works with Vite

// Course management components
import ApproveCourse from "../course_management/ApproveCourse";
import CourseList from "../course_management/CourseList";
import CreateCourse from "../course_management/CreateCourse";
import ManageModules from "../course_management/ManageModules";
import SubmitExam from "../course_management/SubmitExam";

// Certificate management
import TeacherCertificates from "../../pages/TeacherCertificatepage";

// APIs
import {
  uploadMouFile,
  getMous,
  getUniversityAnalytics,
  exportAnalyticsPDF,
  exportAnalyticsExcel,
  getAffiliatedTeachers,
  getUniversityEarnings,
  universityRequestSettlement,
  universityApproveSettlement,
  universityRejectSettlement,
  getTeacherSettlementRequests,
} from "../../api/api";

// UI Components
import CustomButton from "../ui/CustomButton";

export default function UniversityDashboard() {
  const [tab, setTab] = useState("courseManager");

return (
  <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">🏫 University Dashboard</h1>

      {/* --------- Tab Navigation (responsive: horizontal scroll on xs, wrap on sm+) --------- */}
      <div className="mb-6">
        <div className="hidden sm:flex flex-wrap gap-3">
          <TabButton icon={<Users size={18} />} label="Assign Staff" id="assignStaff" tab={tab} setTab={setTab} />
          <TabButton icon={<BookOpen size={18} />} label="Course Manager" id="courseManager" tab={tab} setTab={setTab} />
          <TabButton icon={<Award size={18} />} label="Certificate Officer" id="certificateOfficer" tab={tab} setTab={setTab} />
          <TabButton icon={<FileText size={18} />} label="Document Manager" id="documentManager" tab={tab} setTab={setTab} />
          <TabButton icon={<BarChart size={18} />} label="Analyst" id="analyst" tab={tab} setTab={setTab} />
          <TabButton icon={<Users size={18} />} label="Affiliated Teachers" id="affiliatedTeachers" tab={tab} setTab={setTab} />
          <TabButton icon={<DollarSign size={18} />} label="University Earnings" id="universityEarnings" tab={tab} setTab={setTab} />
          <TabButton icon={<DollarSign size={18} />} label="Teacher Settlements" id="teacherSettlements" tab={tab} setTab={setTab} />
        </div>

        {/* Horizontal scroll for small screens */}
        <div className="sm:hidden -mx-4 px-4">
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
            <div className="flex gap-3">
              <TabButton icon={<Users size={18} />} label="Assign Staff" id="assignStaff" tab={tab} setTab={setTab} />
              <TabButton icon={<BookOpen size={18} />} label="Course Manager" id="courseManager" tab={tab} setTab={setTab} />
              <TabButton icon={<Award size={18} />} label="Certificate Officer" id="certificateOfficer" tab={tab} setTab={setTab} />
              <TabButton icon={<FileText size={18} />} label="Document Manager" id="documentManager" tab={tab} setTab={setTab} />
              <TabButton icon={<BarChart size={18} />} label="Analyst" id="analyst" tab={tab} setTab={setTab} />
              <TabButton icon={<Users size={18} />} label="Affiliated Teachers" id="affiliatedTeachers" tab={tab} setTab={setTab} />
              <TabButton icon={<DollarSign size={18} />} label="University Earnings" id="universityEarnings" tab={tab} setTab={setTab} />
              <TabButton icon={<DollarSign size={18} />} label="Teacher Settlements" id="teacherSettlements" tab={tab} setTab={setTab} />
            </div>
          </div>
        </div>
      </div>

      {/* --------- Tab Content (card) --------- */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6">
        {tab === "assignStaff" && <AssignStaff />}
        {tab === "courseManager" && <CourseManagerPanel />}
        {tab === "certificateOfficer" && <CertificateOfficerPanel />}
        {tab === "documentManager" && <DocumentManagerPanel />}
        {tab === "analyst" && <AnalystPanel />}
        {tab === "affiliatedTeachers" && <AffiliatedTeachersPanel />}
        {tab === "universityEarnings" && <UniversityEarningsPanel />}
        {tab === "teacherSettlements" && <TeacherSettlementRequestsPanel />}
      </div>
    </div>
  </div>
);

}

/* ------------ Tab Button Helper ------------ */
function TabButton({ icon, label, id, tab, setTab }) {
return (
  <button
    onClick={() => setTab(id)}
    className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all
      ${
        tab === id
          ? "bg-blue-600 text-white shadow-md scale-105"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
  >
    <span className="flex-shrink-0">{icon}</span>
    <span className="whitespace-nowrap">{label}</span>
  </button>
);

}

/* ------------ Role Panels ------------ */
function AssignStaff() {
  const [staff, setStaff] = useState([
    { id: 1, name: "Ravi Kumar", role: "Course Manager" },
    { id: 2, name: "Pooja Sharma", role: "Finance Officer" },
  ]);

return (
  <div className="overflow-x-auto">
    <h2 className="text-xl sm:text-2xl font-semibold mb-4">👑 Assign Staff Roles</h2>
    <table className="w-full border rounded-lg overflow-hidden text-sm sm:text-base">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 sm:p-3 border text-left">Name</th>
          <th className="p-2 sm:p-3 border text-left">Role</th>
        </tr>
      </thead>
      <tbody>
        {staff.map((s) => (
          <tr key={s.id} className="hover:bg-gray-50">
            <td className="p-2 sm:p-3 border">{s.name}</td>
            <td className="p-2 sm:p-3 border">
              <select
                value={s.role}
                onChange={(e) =>
                  setStaff((prev) =>
                    prev.map((p) =>
                      p.id === s.id ? { ...p, role: e.target.value } : p
                    )
                  )
                }
                className="border p-2 rounded-lg bg-white w-full sm:w-auto text-sm sm:text-base"
              >
                <option>Course Manager</option>
                <option>Finance Officer</option>
                <option>Certificate Officer</option>
                <option>Document Manager</option>
                <option>Analyst</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}

function CourseManagerPanel() {
return (
  <div className="grid gap-6 p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
      📚 Course Management
    </h2>
    <CreateCourse onCreated={() => window.location.reload()} />
    <CourseList />
    <ApproveCourse />
    <ManageModules courseId="<courseId_here>" />
    <SubmitExam courseId="<courseId_here>" />
  </div>
);

}

function CertificateOfficerPanel() {
return (
  <div className="p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
      🎓 Certificate Management
    </h2>
    <TeacherCertificates />
  </div>
);

}

/* ---------------- Document Manager (MoUs) ---------------- */
function DocumentManagerPanel() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mous, setMous] = useState([]);
  const [loadingMous, setLoadingMous] = useState(false);

  useEffect(() => { fetchMous(); }, []);

  const fetchMous = async () => {
    setLoadingMous(true);
    try {
      const res = await getMous();
      const list = res.data?.mous || res.data?.data || res.data || [];
      setMous(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("fetchMous error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch MoUs.");
    } finally { setLoadingMous(false); }
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first.");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("mouFile", file);
      const res = await uploadMouFile(formData);
      if (res.data?.success) {
        toast.success("MoU uploaded successfully!");
        setFile(null);
        fetchMous();
      } else toast.error(res.data?.message || "Upload failed.");
    } catch (error) {
      console.error("handleUpload error:", error);
      toast.error(error.response?.data?.message || "Something went wrong while uploading.");
    } finally { setUploading(false); }
  };

return (
  <div className="p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4">
      📄 Document Manager (MoUs)
    </h2>

    {/* Upload Section */}
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 w-full"
      />
      {file && (
        <p className="text-sm text-gray-500 mb-2 truncate">
          Selected: {file.name}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <CustomButton onClick={handleUpload} className="bg-black">
          {uploading ? "Uploading..." : "Upload MoU"}
        </CustomButton>
        <CustomButton
          onClick={fetchMous}
          className="bg-red-700"
          label="Refresh List"
        />
      </div>
    </div>

    {/* MoU Table */}
    <div className="overflow-x-auto">
      <table className="w-full border text-sm sm:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border text-left">File / Title</th>
            <th className="p-2 border text-left">Uploaded By</th>
            <th className="p-2 border text-left">Status</th>
            <th className="p-2 border text-left">Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {loadingMous ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-600">
                Loading MoUs...
              </td>
            </tr>
          ) : mous.length > 0 ? (
            mous.map((mou) => (
              <tr key={mou._id} className="hover:bg-gray-50">
                <td className="p-2 border">
                  <span className="block truncate">
                    {mou.title || mou.fileName || "Unnamed MoU"}
                  </span>
                  {mou.fileUrl && (
                    <a
                      href={mou.fileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="ml-1 text-sm text-blue-600 underline"
                    >
                      View
                    </a>
                  )}
                </td>
                <td className="p-2 border">
                  {mou.uploadedBy?.name || "—"}
                </td>
                <td className="p-2 border">{mou.status || "Pending"}</td>
                <td className="p-2 border">
                  {mou.createdAt
                    ? new Date(mou.createdAt).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="p-4 text-center text-gray-500"
              >
                No MoUs found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

}

/* ---------------- Analyst Panel ---------------- */
function AnalystPanel() {
  const [stats, setStats] = useState(null);
  const [exportFormat, setExportFormat] = useState("pdf");
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try { 
        const res = await getUniversityAnalytics(); 
        setStats(res.data.data); 
      } catch (error) { 
        console.error(error); 
        toast.error("Failed to fetch analytics."); 
      }
    };
    fetchAnalytics();
  }, []);

  const handleExport = async () => {
    try {
      setExporting(true);
      let res = exportFormat === "pdf" ? await exportAnalyticsPDF() : await exportAnalyticsExcel();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `analytics-report.${exportFormat === "pdf" ? "pdf" : "xlsx"}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(`Analytics exported as ${exportFormat.toUpperCase()}!`);
    } catch (error) { 
      console.error("Export error:", error); 
      toast.error("Failed to export analytics."); 
    } finally { setExporting(false); }
  };

  if (!stats) return <p>Loading analytics...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📊 Student Performance Analytics</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Total Students: {stats.totalStudents}</li>
        <li>Total Courses: {stats.totalCourses}</li>
        <li>Passed: {stats.passed}</li>
        <li>Failed: {stats.failed}</li>
        <li>Pass Rate: {stats.passRate}</li>
      </ul>
      <div className="flex gap-3 items-center">
        <select value={exportFormat} onChange={(e) => setExportFormat(e.target.value)} className="border rounded-lg px-3 py-2 bg-white">
          <option value="pdf">Export as PDF</option>
          <option value="excel">Export as Excel</option>
        </select>
        <CustomButton onClick={handleExport} className="bg-black">{exporting ? "Exporting..." : "Export"}</CustomButton>
      </div>
    </div>
  );
}

/* ---------------- Affiliated Teachers Panel ---------------- */
function AffiliatedTeachersPanel() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try { 
        const res = await getAffiliatedTeachers(); 
        setTeachers(res.teachers || []); 
      } catch (error) { 
        console.error(error); 
        toast.error(error.message || "Failed to load teachers"); 
      } finally { setLoading(false); }
    };
    fetchTeachers();
  }, []);

  if (loading) return <p>Loading affiliated teachers...</p>;

return (
  <div className="p-4 sm:p-6">
    <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">
      👩‍🏫 Affiliated Teachers
    </h2>

    {teachers.length === 0 ? (
      <p className="text-gray-600 text-center bg-gray-50 py-6 rounded-lg shadow-sm">
        No affiliated teachers found.
      </p>
    ) : (
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-center">Status</th>
              <th className="p-3 border text-center">Joined</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((t) => (
              <tr
                key={t._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 border font-medium">{t.name}</td>
                <td className="p-3 border">{t.email}</td>
                <td className="p-3 border text-center">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      (t.status || "Active") === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.status || "Active"}
                  </span>
                </td>
                <td className="p-3 border text-center">
                  {t.createdAt
                    ? new Date(t.createdAt).toLocaleDateString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

}

/* ---------------- University Earnings Panel ---------------- */
function UniversityEarningsPanel() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requestAmount, setRequestAmount] = useState("");
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const decoded = jwtDecode(token); // ✅ decode JWT
      // console.log("Decoded JWT:", decoded);
      
        const universityId = decoded.id;
        if (!universityId) throw new Error("University ID not found in token");

        const res = await getUniversityEarnings(universityId);
        setWallet(res.data || null);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || "Failed to fetch earnings.");
        setWallet(null);
      } finally { setLoading(false); }
    };
    fetchEarnings();
  }, []);

  if (loading) return <p>Loading university earnings...</p>;
  if (!wallet) return <p>No wallet data available.</p>;

  const totalCredits = wallet.transactions
    ?.filter((tx) => tx.type === "credit" && tx.status === "approved")
    .reduce((sum, tx) => sum + tx.amount, 0) || 0;

  const handleRequestSettlement = async () => {
    if (!requestAmount || Number(requestAmount) <= 0) return toast.error("Enter a valid amount");
    setRequesting(true);
    try {
      const res = await universityRequestSettlement({ amount: Number(requestAmount) });
      setWallet(res.data.wallet);
      toast.success(res.data.message);
      setRequestAmount("");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Settlement request failed.");
    } finally { setRequesting(false); }
  };

return (
  <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-gray-800">
          💰 University Earnings & Settlements
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Total Approved Credits: <strong className="text-gray-900">₹{totalCredits}</strong>
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <input
          type="number"
          value={requestAmount}
          onChange={(e) => setRequestAmount(e.target.value)}
          placeholder="Enter settlement amount"
          className="border p-2 rounded w-full sm:w-64 focus:ring-2 focus:ring-emerald-300 outline-none"
          aria-label="Settlement amount"
        />
        <div className="w-full sm:w-auto">
          <CustomButton onClick={handleRequestSettlement} className="w-full sm:w-auto bg-black">
            {requesting ? "Requesting..." : "Request Settlement"}
          </CustomButton>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-sm bg-white">
        <table className="w-full min-w-[720px] text-sm sm:text-base border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Type</th>
              <th className="p-3 border text-right">Amount</th>
              <th className="p-3 border text-center">Status</th>
              <th className="p-3 border text-left">Description</th>
              <th className="p-3 border text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {wallet?.transactions?.length ? (
              wallet.transactions.map((tx) => (
                <tr key={tx._id} className="hover:bg-gray-50">
                  <td className="p-3 border align-top">{tx.type}</td>
                  <td className="p-3 border text-right align-top">₹{Number(tx.amount).toLocaleString()}</td>
                  <td className="p-3 border text-center align-top">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        tx.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-3 border align-top break-words">{tx.description}</td>
                  <td className="p-3 border align-top whitespace-nowrap">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

}

/* ---------------- Teacher Settlement Requests Panel ---------------- */
function TeacherSettlementRequestsPanel() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await getTeacherSettlementRequests();
      console.log(res,"response");
      
      setRequests(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch teacher requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleApprove = async (id) => {
    try {
      await universityApproveSettlement({ requestId: id });
      toast.success("Teacher settlement approved");
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to approve");
    }
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await getAffiliatedTeachers();
        setTeachers(res.teachers || []);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };
    fetchTeachers();
  }, []);

  // Now getTeacherEmail has access to the teachers state
  const getTeacherEmail = (teacher_id) => {
    const teacher = teachers.find((t) => t._id === teacher_id);
    return teacher ? teacher.email : "-";
  };

  const getTeacherName = (teacher_id) => {
    const teacher = teachers.find((t) => t._id === teacher_id);
    return teacher ? teacher.name : "-";
  }

  const handleReject = async (id) => {
    try {
      await universityRejectSettlement({ requestId: id });
      toast.success("Teacher settlement rejected");
      fetchRequests();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to reject");
    }
  };

  if (loading) return <p>Loading teacher settlement requests...</p>;
  if (!requests.length) return <p>No pending teacher settlement requests.</p>;

return (
  <div className="p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4">👨‍🏫 Teacher Settlement Requests</h2>

    <div className="overflow-x-auto">
      {/* Desktop / tablet table */}
      <table className="w-full border-collapse hidden md:table">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border text-left">Teacher</th>
            <th className="p-3 border text-left">Email</th>
            <th className="p-3 border text-right">Amount</th>
            <th className="p-3 border text-center">Status</th>
            <th className="p-3 border text-left">Requested At</th>
            <th className="p-3 border text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {requests?.length ? (
            requests.map((req) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="p-3 border align-top">{getTeacherName(req.sourceOwnerId)}</td>
                <td className="p-3 border align-top">{getTeacherEmail(req.sourceOwnerId)}</td>
                <td className="p-3 border text-right align-top">₹{Number(req.amount).toLocaleString()}</td>
                <td className="p-3 border text-center align-top">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      req.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : req.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status}
                  </span>
                </td>
                <td className="p-3 border align-top whitespace-nowrap">{new Date(req.createdAt).toLocaleString()}</td>
                <td className="p-3 border text-center align-top">
                  <div className="inline-flex gap-2">
                    <CustomButton onClick={() => handleApprove(req._id)} className="bg-green-600 px-3 py-1 text-sm">
                      Approve
                    </CustomButton>
                    <CustomButton onClick={() => handleReject(req._id)} className="bg-red-600 px-3 py-1 text-sm">
                      Reject
                    </CustomButton>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No settlement requests found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Mobile card list fallback */}
    <div className="md:hidden space-y-3">
      {requests?.length ? (
        requests.map((req) => (
          <div
            key={req._id}
            className="bg-white border rounded-lg p-4 shadow-sm"
            role="group"
            aria-label={`Settlement request ${req._id}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">{getTeacherName(req.sourceOwnerId)}</div>
                <div className="text-xs text-gray-500 truncate">{getTeacherEmail(req.sourceOwnerId)}</div>
              </div>

              <div className="text-right">
                <div className="font-medium">₹{Number(req.amount).toLocaleString()}</div>
                <div className="text-xs text-gray-400">{new Date(req.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                    req.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : req.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {req.status}
                </span>
              </div>

              <div className="flex gap-2">
                <CustomButton onClick={() => handleApprove(req._id)} className="bg-green-600 px-3 py-1 text-sm">
                  Approve
                </CustomButton>
                <CustomButton onClick={() => handleReject(req._id)} className="bg-red-600 px-3 py-1 text-sm">
                  Reject
                </CustomButton>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-500 bg-white rounded-lg shadow-sm">No settlement requests found.</div>
      )}
    </div>
  </div>
);

}
