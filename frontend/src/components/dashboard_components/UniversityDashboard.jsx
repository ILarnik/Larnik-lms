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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🏫 University Dashboard</h1>

      {/* --------- Tab Navigation --------- */}
      <div className="flex flex-wrap gap-3 mb-6">
        <TabButton icon={<Users size={18} />} label="Assign Staff" id="assignStaff" tab={tab} setTab={setTab} />
        <TabButton icon={<BookOpen size={18} />} label="Course Manager" id="courseManager" tab={tab} setTab={setTab} />
        <TabButton icon={<Award size={18} />} label="Certificate Officer" id="certificateOfficer" tab={tab} setTab={setTab} />
        <TabButton icon={<FileText size={18} />} label="Document Manager" id="documentManager" tab={tab} setTab={setTab} />
        <TabButton icon={<BarChart size={18} />} label="Analyst" id="analyst" tab={tab} setTab={setTab} />
        <TabButton icon={<Users size={18} />} label="Affiliated Teachers" id="affiliatedTeachers" tab={tab} setTab={setTab} />
        <TabButton icon={<DollarSign size={18} />} label="University Earnings" id="universityEarnings" tab={tab} setTab={setTab} />
        <TabButton icon={<DollarSign size={18} />} label="Teacher Settlements" id="teacherSettlements" tab={tab} setTab={setTab} />
      </div>

      {/* --------- Tab Content --------- */}
      <div className="bg-white rounded-xl shadow p-4">
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
  );
}

/* ------------ Tab Button Helper ------------ */
function TabButton({ icon, label, id, tab, setTab }) {
  return (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded transition
        ${tab === id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
    >
      {icon}{label}
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
    <div>
      <h2 className="text-xl font-semibold mb-4">👑 Assign Staff Roles</h2>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Role</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {staff.map((s) => (
            <tr key={s.id}>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">
                <select
                  value={s.role}
                  onChange={(e) =>
                    setStaff((prev) =>
                      prev.map((p) => (p.id === s.id ? { ...p, role: e.target.value } : p))
                    )
                  }
                  className="border p-1 rounded bg-white"
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
    <div className="grid gap-6">
      <h2 className="text-xl font-semibold">📚 Course Management</h2>
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
    <div>
      <h2 className="text-xl font-semibold mb-4">🎓 Certificate Management</h2>
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
    <div>
      <h2 className="text-xl font-semibold mb-4">📄 Document Manager (MoUs)</h2>
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-3" />
        {file && <p className="text-sm text-gray-500 mb-2">Selected: {file.name}</p>}
        <div className="flex gap-3">
          <CustomButton onClick={handleUpload} className="bg-black">{uploading ? "Uploading..." : "Upload MoU"}</CustomButton>
          <CustomButton onClick={fetchMous} className="bg-red-700" label="Refresh List" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border">
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
              <tr><td colSpan="4" className="p-4 text-center text-gray-600">Loading MoUs...</td></tr>
            ) : mous.length > 0 ? (
              mous.map((mou) => (
                <tr key={mou._id}>
                  <td className="p-2 border">
                    {mou.title || mou.fileName || "Unnamed MoU"}
                    {mou.fileUrl && <a href={mou.fileUrl} target="_blank" rel="noreferrer" className="ml-2 text-sm text-blue-600 underline">View</a>}
                  </td>
                  <td className="p-2 border">{mou.uploadedBy?.name || "—"}</td>
                  <td className="p-2 border">{mou.status || "Pending"}</td>
                  <td className="p-2 border">{mou.createdAt ? new Date(mou.createdAt).toLocaleString() : "—"}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="p-4 text-center text-gray-500">No MoUs found.</td></tr>
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
    <div>
      <h2 className="text-3xl font-semibold mb-4">👩‍🏫 Affiliated Teachers</h2>
      {teachers.length === 0 ? (
        <p className="text-gray-600">No affiliated teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Joined</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t._id}>
                  <td className="p-2 border">{t.name}</td>
                  <td className="p-2 border">{t.email}</td>
                  <td className="p-2 border">{t.status || "Active"}</td>
                  <td className="p-2 border">{t.createdAt ? new Date(t.createdAt).toLocaleDateString() : "—"}</td>
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
    <div>
      <h2 className="text-xl font-semibold mb-4">💰 University Earnings & Settlements</h2>
      <p className="mb-4">Total Approved Credits: <strong>${totalCredits}</strong></p>

      <div className="mb-6 flex gap-3 items-center">
        <input
          type="number"
          value={requestAmount}
          onChange={(e) => setRequestAmount(e.target.value)}
          placeholder="Enter settlement amount"
          className="border p-2 rounded w-64"
        />
        <CustomButton onClick={handleRequestSettlement} className="bg-black">
          {requesting ? "Requesting..." : "Request Settlement"}
        </CustomButton>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border rounded text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Created At</th>
            </tr>
          </thead>
          <tbody>
            {wallet.transactions?.map((tx) => (
              <tr key={tx._id}>
                <td className="p-2 border">{tx.type}</td>
                <td className="p-2 border">Rs.{tx.amount}</td>
                <td className="p-2 border">{tx.status}</td>
                <td className="p-2 border">{tx.description}</td>
                <td className="p-2 border">{new Date(tx.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
    <div>
      <h2 className="text-xl font-semibold mb-4">👨‍🏫 Teacher Settlement Requests</h2>
      <div className="overflow-x-auto">
        <table className="w-full border rounded text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Teacher</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Requested At</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests?.map((req) => (
              <tr key={req._id}>
                <td className="p-2 border">{getTeacherName(req.sourceOwnerId)}</td>
                <td className="p-2 border">{getTeacherEmail(req.sourceOwnerId)}</td>
                <td className="p-2 border">${req.amount}</td>
                <td className="p-2 border">{req.status}</td>
                {/* <td className="p-2 border">{req.sourceOwnerType}</td> */}
                <td className="p-2 border">{new Date(req.createdAt).toLocaleString()}</td>
                <td className="p-2 border flex gap-2 justify-center">
                  <CustomButton onClick={() => handleApprove(req._id)} className="bg-green-600">Approve</CustomButton>
                  <CustomButton onClick={() => handleReject(req._id)} className="bg-red-600">Reject</CustomButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
