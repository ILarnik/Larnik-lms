 import React, { useState } from "react";
import { Briefcase, BookOpen, Video } from "lucide-react";
import JobsPage from "../../pages/JobsPage";
import GuidesPage from "../../pages/GuidesPage";
import WebinarsPage from "../../pages/WebinarsPage";

export default function CareerCellDashboard() {
  const [tab, setTab] = useState("jobs");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">🎓 Career Cell Dashboard</h2>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setTab("jobs")} className={`px-4 py-2 rounded flex items-center gap-2 ${tab === "jobs" ? "bg-blue-600 text-white" : "bg-gray-100"}`}><Briefcase size={18} /> Jobs</button>
        <button onClick={() => setTab("guides")} className={`px-4 py-2 rounded flex items-center gap-2 ${tab === "guides" ? "bg-blue-600 text-white" : "bg-gray-100"}`}><BookOpen size={18} /> Guides</button>
        <button onClick={() => setTab("webinars")} className={`px-4 py-2 rounded flex items-center gap-2 ${tab === "webinars" ? "bg-blue-600 text-white" : "bg-gray-100"}`}><Video size={18} /> Webinars</button>
      </div>

      <div className="bg-white shadow rounded-xl p-4">
        {tab === "jobs" && <JobsPage />}
        {tab === "guides" && <GuidesPage />}
        {tab === "webinars" && <WebinarsPage />}
      </div>
    </div>
  );
}
