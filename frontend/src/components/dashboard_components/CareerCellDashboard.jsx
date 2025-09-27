import React, { useState } from "react";
import { Briefcase, BookOpen, Video } from "lucide-react";
import JobsPage from "../../pages/JobsPage";
import GuidesPage from "../../pages/GuidesPage";
import WebinarsPage from "../../pages/WebinarsPage";

export default function CareerCellDashboard() {
  const [tab, setTab] = useState("jobs");

  const tabs = [
    { id: "jobs", label: "Jobs", icon: <Briefcase size={18} /> },
    { id: "guides", label: "Guides", icon: <BookOpen size={18} /> },
    { id: "webinars", label: "Webinars", icon: <Video size={18} /> },
  ];

return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4 sm:p-8 lg:p-10">
    {/* Decorative blurred balls */}
    <div className="hidden sm:block absolute top-16 left-10 w-32 h-32 sm:w-48 sm:h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
    <div className="hidden sm:block absolute bottom-20 right-10 w-40 h-40 sm:w-64 sm:h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

    {/* Glass Card Container */}
    <div className="relative z-10 max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-white/30 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 mb-6 sm:mb-8 text-center">
        🎓 Career Cell Dashboard
      </h2>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-xl font-medium shadow transition-all duration-300 text-sm sm:text-base
              ${
                tab === t.id
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                  : "bg-white/60 text-gray-800 hover:bg-white hover:scale-105"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 min-h-[50vh] sm:min-h-[60vh]">
        {tab === "jobs" && <JobsPage />}
        {tab === "guides" && <GuidesPage />}
        {tab === "webinars" && <WebinarsPage />}
      </div>
    </div>
  </div>
);

}
