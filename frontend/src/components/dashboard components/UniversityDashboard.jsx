 // src/components/UniversityDashboard.jsx
import React, { useState, useEffect } from "react";
import { Users, BookOpen, Award, FileText, BarChart } from "lucide-react";
import { toast } from "react-hot-toast";

// Course management components
import ApproveCourse from "../course management/ApproveCourse";
import CourseList from "../course management/CourseList";
import CreateCourse from "../course management/CreateCourse";
import ManageModules from "../course management/ManageModules";
import SubmitExam from "../course management/SubmitExam";

// Certificate management
import CertificateManagerPage from "../../pages/Certificatepage";

// APIs
import { uploadMouFile, getMous, getUniversityAnalytics , exportAnalyticsPDF, exportAnalyticsExcel} from "../../api/api";

export default function UniversityDashboard() {
  const [tab, setTab] = useState("courseManager");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">🏫 University Dashboard</h1>

      {/* --------- Tab Navigation --------- */}
      <div className="flex flex-wrap gap-3 mb-6">
        <TabButton icon={<Users size={18} />} label="Assign Staff" id="superAdmin" tab={tab} setTab={setTab} />
        <TabButton icon={<BookOpen size={18} />} label="Course Manager" id="courseManager" tab={tab} setTab={setTab} />
        <TabButton icon={<Award size={18} />} label="Certificate Officer" id="certificateOfficer" tab={tab} setTab={setTab} />
        <TabButton icon={<FileText size={18} />} label="Document Manager" id="documentManager" tab={tab} setTab={setTab} />
        <TabButton icon={<BarChart size={18} />} label="Analyst" id="analyst" tab={tab} setTab={setTab} />
      </div>

      {/* --------- Tab Content --------- */}
      <div className="bg-white rounded-xl shadow p-4">
        {tab === "superAdmin" && <SuperAdminPanel />}
        {tab === "courseManager" && <CourseManagerPanel />}
        {tab === "certificateOfficer" && <CertificateOfficerPanel />}
        {tab === "documentManager" && <DocumentManagerPanel />}
        {tab === "analyst" && <AnalystPanel />}
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

function SuperAdminPanel() {
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
        <tbody>
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
                  className="border p-1 rounded"
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
      <CertificateManagerPage />
    </div>
  );
}

/* ---------------- Document Manager (MoUs) ---------------- */
function DocumentManagerPanel() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mous, setMous] = useState([]);
  const [loadingMous, setLoadingMous] = useState(false);

  useEffect(() => {
    fetchMous();
  }, []);

  const fetchMous = async () => {
    setLoadingMous(true);
    try {
      const res = await getMous();
      // ✅ robust handling of backend response shape
      const list =
        res.data?.mous || res.data?.data || res.data || [];
      setMous(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("fetchMous error:", error);
      toast.error(error.response?.data?.message || "Failed to fetch MoUs.");
    } finally {
      setLoadingMous(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("mouFile", file); // 🔑 must match multer field name

      const res = await uploadMouFile(formData);
      if (res.data?.success) {
        toast.success("MoU uploaded successfully!");
        setFile(null);
        fetchMous();
      } else {
        toast.error(res.data?.message || "Upload failed.");
      }
    } catch (error) {
      console.error("handleUpload error:", error);
      toast.error(error.response?.data?.message || "Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">📄 Document Manager (MoUs)</h2>

      {/* File Upload Section */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />
        {file && <p className="text-sm text-gray-500 mb-2">Selected: {file.name}</p>}
        <div className="flex gap-3">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload MoU"}
          </button>
          <button
            onClick={fetchMous}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Refresh List
          </button>
        </div>
      </div>

      {/* MoU List */}
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
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-600">
                  Loading MoUs...
                </td>
              </tr>
            ) : mous.length > 0 ? (
              mous.map((mou) => (
                <tr key={mou._id}>
                  <td className="p-2 border">
                    {mou.title || mou.fileName || "Unnamed MoU"}
                    {mou.fileUrl && (
                      <a
                        href={mou.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="ml-2 text-sm text-blue-600 underline"
                      >
                        View
                      </a>
                    )}
                  </td>
                  <td className="p-2 border">{mou.uploadedBy?.name || "—"}</td>
                  <td className="p-2 border">{mou.status || "Pending"}</td>
                  <td className="p-2 border">
                    {mou.createdAt ? new Date(mou.createdAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
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

/* ---------------- Analyst Panel (with API) ---------------- */
// function AnalystPanel() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await getUniversityAnalytics();
//         console.log("Analytics data:", res.data);
//         setStats(res.data.data); // backend sends data inside `data`
//       } catch (error) {
//         console.error("Error fetching analytics:", error);
//         toast.error("Failed to fetch analytics.");
//       }
//     };
//     fetchAnalytics();
//   }, []);

//   if (!stats) return <p>Loading analytics...</p>;

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4">📊 Student Performance Analytics</h2>
//       <ul className="list-disc pl-6 mb-4">
//         <li>Total Students: {stats.totalStudents}</li>
//         <li>Total Courses: {stats.totalCourses}</li>
//         <li>Passed: {stats.passed}</li>
//         <li>Failed: {stats.failed}</li>
//         <li>Pass Rate: {stats.passRate}</li>
//       </ul>
//       <button className="bg-purple-600 text-white px-4 py-2 rounded">
//         Export Report
//       </button>
//     </div>
//   );
// }
/* ---------------- Analyst Panel (with API + Export) ---------------- */
 

function AnalystPanel() {
  const [stats, setStats] = useState(null);
  const [exportFormat, setExportFormat] = useState("pdf"); // default PDF
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await getUniversityAnalytics();
        console.log("Analytics data:", res.data);
        setStats(res.data.data); // backend sends data inside `data`
      } catch (error) {
        console.error("Error fetching analytics:", error);
        toast.error("Failed to fetch analytics.");
      }
    };
    fetchAnalytics();
  }, []);

  const handleExport = async () => {
    try {
      setExporting(true);
      let res;

      if (exportFormat === "pdf") {
        res = await exportAnalyticsPDF();
      } else {
        res = await exportAnalyticsExcel();
      }

      // Blob download
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `analytics-report.${exportFormat === "pdf" ? "pdf" : "xlsx"}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(`Analytics exported as ${exportFormat.toUpperCase()}!`);
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export analytics.");
    } finally {
      setExporting(false);
    }
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

      {/* Export Section */}
      <div className="flex gap-3 items-center">
        <select
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="pdf">Export as PDF</option>
          <option value="excel">Export as Excel</option>
        </select>

        <button
          onClick={handleExport}
          disabled={exporting}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
        >
          {exporting ? "Exporting..." : "Export"}
        </button>
      </div>
    </div>
  );
}
