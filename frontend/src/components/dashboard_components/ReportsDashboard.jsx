//  import React, { useState, useEffect } from "react";
// import { createReport, getReports, downloadReport, deleteReport } from "../../api/api";
// import { toast } from "react-hot-toast";

// const reportTypes = ["Revenue", "Enrollment", "Analytics"];
// const reportFormats = ["pdf", "excel", "word"];

// const ReportsDashboard = () => {
//   const [reports, setReports] = useState([]);
//   const [type, setType] = useState("Revenue");
//   const [format, setFormat] = useState("pdf");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const { data } = await getReports();
//       setReports(data.reports);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleGenerate = async () => {
//     try {
//       setLoading(true);

//       // Auto-generate title
//       let title = `${type} Report`;

//       const filters = type === "Enrollment" ? { startDate, endDate } : {};

//       const { data } = await createReport({ title, type, filters, format });
//       toast.success("Report generated successfully!");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to generate report");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Download report function
//   const handleDownload = async (report) => {
//     try {
//       const response = await downloadReport(report._id, report.format);
//       const blob = new Blob([response.data], { type: response.headers["content-type"] });
//       const link = document.createElement("a");
//       link.href = window.URL.createObjectURL(blob);
//       link.download = `${report.title}.${report.format}`;
//       link.click();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to download report");
//     }
//   };

//   // ✅ Delete report function
//   const handleDelete = async (reportId) => {
//     try {
//       await deleteReport(reportId);
//       toast.success("Report deleted successfully");
//       fetchReports();
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to delete report");
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Reports Dashboard</h1>

//       <div className="mb-4 flex gap-4 items-center">
//         <select value={type} onChange={(e) => setType(e.target.value)}>
//           {reportTypes.map((t) => (
//             <option key={t} value={t}>{t}</option>
//           ))}
//         </select>

//         <select value={format} onChange={(e) => setFormat(e.target.value)}>
//           {reportFormats.map((f) => (
//             <option key={f} value={f}>{f.toUpperCase()}</option>
//           ))}
//         </select>

//         {type === "Enrollment" && (
//           <>
//             <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//             <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//           </>
//         )}

//         <button onClick={handleGenerate} disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
//           {loading ? "Generating..." : "Generate Report"}
//         </button>
//       </div>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-200">
//             <th>Title</th>
//             <th>Type</th>
//             <th>Format</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reports.map((report) => (
//             <tr key={report._id} className="border-t">
//               <td>{report.title}</td>
//               <td>{report.type}</td>
//               <td>{report.format}</td>
//               <td className="flex gap-2">
//                 <button onClick={() => handleDownload(report)} className="bg-green-500 text-white px-2 py-1 rounded">Download</button>
//                 <button onClick={() => handleDelete(report._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ReportsDashboard;



import React, { useState, useEffect } from "react";
import { createReport, getReports, downloadReport, deleteReport } from "../../api/api";
import { toast } from "react-hot-toast";

const reportTypes = ["Revenue", "Enrollment", "Analytics"];
const reportFormats = ["pdf", "excel", "word"];

const ReportsDashboard = () => {
  const [reports, setReports] = useState([]);
  const [type, setType] = useState("Revenue");
  const [format, setFormat] = useState("pdf");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const { data } = await getReports();
      setReports(data.reports);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async () => {
    try {
      setLoading(true);
      const title = `${type} Report`;
      const filters = type === "Enrollment" ? { startDate, endDate } : {};
      await createReport({ title, type, filters, format });
      toast.success("Report generated successfully!");
      fetchReports();
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate report");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (report) => {
    try {
      const response = await downloadReport(report._id, report.format);
      const blob = new Blob([response.data], { type: response.headers["content-type"] });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${report.title}.${report.format}`;
      link.click();
    } catch (err) {
      console.error(err);
      toast.error("Failed to download report");
    }
  };

  const handleDelete = async (reportId) => {
    try {
      await deleteReport(reportId);
      toast.success("Report deleted successfully");
      fetchReports();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete report");
    }
  };

  return (
    <div className=" p-6 bg-gradient-to-br from-green-100 via-white to-green-200">
      <h1 className="text-3xl font-bold mb-6 text-green-800">📊 Reports Dashboard</h1>

      {/* Report Controls */}
      <div className="mb-8 p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg flex flex-wrap items-center gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
        >
          {reportTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
        >
          {reportFormats.map((f) => (
            <option key={f} value={f}>
              {f.toUpperCase()}
            </option>
          ))}
        </select>

        {type === "Enrollment" && (
          <>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-green-400"
            />
          </>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl shadow-md transition-all"
        >
          {loading ? "Generating..." : "Generate Report"}
        </button>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto rounded-2xl shadow-md bg-white/80 backdrop-blur-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-green-100 text-green-800 text-left">
              <th className="p-4">Title</th>
              <th className="p-4">Type</th>
              <th className="p-4">Format</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No reports available
                </td>
              </tr>
            ) : (
              reports.map((report) => (
                <tr
                  key={report._id}
                  className="border-t hover:bg-green-50 transition-colors"
                >
                  <td className="p-4">{report.title}</td>
                  <td className="p-4">{report.type}</td>
                  <td className="p-4 uppercase">{report.format}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => handleDownload(report)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg shadow-sm transition-all"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow-sm transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsDashboard;
