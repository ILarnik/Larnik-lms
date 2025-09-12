// src/components/UniversityDashboard.jsx
import React, { useState } from "react";
import ApproveCourse from "../course management/ApproveCourse";
import CourseList from "../course management/CourseList";
import CreateCourse from "../course management/CreateCourse";
import ManageModules from "../course management/ManageModules";
import SubmitExam from "../course management/SubmitExam";






import { deleteCertificateTemplate } from "../../api/api";
import { jwtDecode } from "jwt-decode";
import CertificateManagerPage from "../../pages/certificatepage";

// 🔑 Utility to decode role from JWT
const getUserRole = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const decoded = jwtDecode(token);
    return decoded.role || null;
  } catch {
    return null;
  }
};

export default function UniversityDashboard() {
  const role = getUserRole();
  const [tab, setTab] = useState("courses");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreated = () => setRefreshKey((prev) => prev + 1);
  const handleDelete = async (id) => {
    await deleteCertificateTemplate(id);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold">🏫 University Dashboard</h2>

      {/* Tabs Navigation */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setTab("courses")}
          className={`px-4 py-2 rounded ${
            tab === "courses" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setTab("certificates")}
          className={`px-4 py-2 rounded ${
            tab === "certificates" ? "bg-blue-600 text-white" : "bg-gray-100"
          }`}
        >
          Certificates
        </button>
        {role === "superadmin" && (
          <button
            onClick={() => setTab("templates")}
            className={`px-4 py-2 rounded ${
              tab === "templates" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          >
            Certificate Templates
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className="bg-white shadow rounded-xl p-4">
        {tab === "courses" && (
          <div className="grid gap-6">
            <CreateCourse onCreated={() => window.location.reload()} />
            <CourseList />
            <ApproveCourse />
            <ManageModules courseId="<courseId_here>" />
            <SubmitExam courseId="<courseId_here>" />
          </div>
        )}

        {tab === "certificates" && (
          // <div className="flex flex-col gap-6 bg-red-500">
          //   {/* Issued Certificates */}
          //   <div>
          //     <h3 className="text-xl font-semibold mb-3">All Issued Certificates</h3>
          //     {/* <CertificateList /> */}
          //   </div>

          //   {/* Issue Certificate */}
          //   {["teacher", "university", "superadmin"].includes(role) && (
          //     <div>
          //       <h3 className="text-xl font-semibold mb-3">Issue New Certificate</h3>
          //       {/* <IssueCertificateForm /> */}
          //     </div>
          //   )}

          //   {/* Manage Templates (inside Certificates, superadmin only) */}
          //   {role === "superadmin" && (
          //     <div>
          //       <h3 className="text-xl font-semibold mb-3">Manage Templates</h3>
          //       {/* <CertificateTemplateForm /> */}
          //     </div>
          //   )}
          // </div>
             <div className="grid gap-6 p-6">
                 <CertificateManagerPage />
                </div>
        )}

        {tab === "templates" && role === "superadmin" && (
          <div className="grid gap-6 bg-blue-600">
            {/* <CreateCertificateTemplate onCreated={handleCreated} /> */}
            {/* <CertificateTemplates refreshKey={refreshKey} onDelete={handleDelete} /> */}
          </div>
        )}
      </div>
    </div>
  );
}
