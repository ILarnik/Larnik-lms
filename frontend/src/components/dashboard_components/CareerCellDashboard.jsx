// //  import React, { useState } from "react";
// // import { Briefcase, BookOpen, Video } from "lucide-react";
// // import JobsPage from "../../pages/JobsPage";
// // import GuidesPage from "../../pages/GuidesPage";
// // import WebinarsPage from "../../pages/WebinarsPage";

// // export default function CareerCellDashboard() {
// //   const [tab, setTab] = useState("jobs");

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <h2 className="text-2xl font-bold mb-6">🎓 Career Cell Dashboard</h2>

// //       <div className="flex gap-4 mb-6">
// //         <button onClick={() => setTab("jobs")} className={`px-4 py-2 rounded flex items-center gap-2 ${tab === "jobs" ? "bg-blue-600 text-white" : "bg-gray-100"}`}><Briefcase size={18} /> Jobs</button>
// //         <button onClick={() => setTab("guides")} className={`px-4 py-2 rounded flex items-center gap-2 ${tab === "guides" ? "bg-blue-600 text-white" : "bg-gray-100"}`}><BookOpen size={18} /> Guides</button>
// //         <button onClick={() => setTab("webinars")} className={`px-4 py-2 rounded flex items-center gap-2 ${tab === "webinars" ? "bg-blue-600 text-white" : "bg-gray-100"}`}><Video size={18} /> Webinars</button>
// //       </div>

// //       <div className="bg-white shadow rounded-xl p-4">
// //         {tab === "jobs" && <JobsPage />}
// //         {tab === "guides" && <GuidesPage />}
// //         {tab === "webinars" && <WebinarsPage />}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import { Briefcase, BookOpen, Video } from "lucide-react";
// import JobsPage from "../../pages/JobsPage";
// import GuidesPage from "../../pages/GuidesPage";
// import WebinarsPage from "../../pages/WebinarsPage";

// export default function CareerCellDashboard() {
//   const [tab, setTab] = useState("jobs");

//   const tabs = [
//     { id: "jobs", label: "Jobs", icon: <Briefcase size={18} /> },
//     { id: "guides", label: "Guides", icon: <BookOpen size={18} /> },
//     { id: "webinars", label: "Webinars", icon: <Video size={18} /> },
//   ];

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-10">
//       {/* Decorative blurred balls */}
//       <div className="absolute top-16 left-10 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
//       <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

//       {/* Glass Card Container */}
//       <div className="relative z-10 max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8">
//         {/* Header */}
//         <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
//           🎓 Career Cell Dashboard
//         </h2>

//         {/* Tab Navigation */}
//         <div className="flex justify-center gap-6 mb-8">
//           {tabs.map((t) => (
//             <button
//               key={t.id}
//               onClick={() => setTab(t.id)}
//               className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow transition-all duration-300 
//                 ${
//                   tab === t.id
//                     ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
//                     : "bg-white/60 text-gray-800 hover:bg-white hover:scale-105"
//                 }`}
//             >
//               {t.icon}
//               {t.label}
//             </button>
//           ))}
//         </div>

//         {/* Content Section */}
//         <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 min-h-[60vh]">
//           {tab === "jobs" && <JobsPage />}
//           {tab === "guides" && <GuidesPage />}
//           {tab === "webinars" && <WebinarsPage />}
//         </div>
//       </div>
//     </div>
//   );
// }



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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-10">
      {/* Decorative blurred balls */}
      <div className="absolute top-16 left-10 w-48 h-48 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Glass Card Container */}
      <div className="relative z-10 max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-3xl shadow-xl border border-white/30 p-8">
        {/* Header */}
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          🎓 Career Cell Dashboard
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center gap-6 mb-8">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium shadow transition-all duration-300 
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
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 min-h-[60vh]">
          {tab === "jobs" && <JobsPage />}
          {tab === "guides" && <GuidesPage />}
          {tab === "webinars" && <WebinarsPage />}
        </div>
      </div>
    </div>
  );
}
