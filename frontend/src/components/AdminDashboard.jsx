 import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  GraduationCap,
  User,
  Building2,
  UserPlus,
  Shield,
  BookOpen,
  Bell,
  DollarSign,
  ChevronDown,
  Sun,
  Globe,
  Rss,
  Landmark,
  Award,
  Notebook,
} from "lucide-react";

import SearchBar from "./SearchBar";
import DashboardCard from "./DashboardCard";
import CouponManager from "./dashboard_components/CouponManager";
import ManageSubAdmins from "./dashboard_components/ManageSubAdmins";
import UserManagement from "./UserManagement";
import CourseDashboard from "./dashboard_components/CourseManagement";
import BlogManagerDashboard from "./dashboard_components/BlogManagerDashboard";
import ReportsDashboard from "./dashboard_components/ReportsDashboard.jsx";
import CertificateManagerPage from "../pages/certificatepage";
import GovernanceDashboard from "./dashboard_components/GovernanceDashboard";


// ✅ Import APIs
import {
  getStudents,
  getTeachers,
  getUniversity,
  getReferral,
   getPartners,
  getSubAdmins,
} from "../api/api"; // adjust path if needed
//import NotificationDashboard from "./dashboard_components/NotificationDashboard";

// Sidebar menu structure
const menuItems = [
  { title: "Dashboard", icon: <Home size={18} /> },
  {
    title: "User Management",
    icon: <Users size={18} />,
    children: [
      { title: "Add User", icon: <UserPlus size={16} /> },
      { title: "Students", icon: <GraduationCap size={16} /> },
      { title: "Teachers", icon: <User size={16} /> },
      { title: "University", icon: <Building2 size={16} /> },
      { title: "Referral", icon: <UserPlus size={16} /> },
      { title: "Partners", icon: <UserPlus size={16} /> },
      { title: "Sub-Admin", icon: <Shield size={16} /> },
    ],
  },
  { title: "Course Management", icon: <BookOpen size={18} /> },
  { title: "Notifications", icon: <Bell size={18} /> },
  { title: "Finance & Settlement", icon: <DollarSign size={18} /> },
  { title: "Certificate", icon: <Award size={18} /> },
  { title: "Report", icon: <Notebook size={18} /> },
  { title: "Blog", icon: <Rss size={18} /> },
  { title: "Governance", icon: <Landmark size={18} /> },
  // { title: "doc uni", icon: <Landmark size={18} /> },
];

export default function AdminDashboard() {
  const [openSections, setOpenSections] = useState({});
  const [activeItem, setActiveItem] = useState("Dashboard");

  // ✅ Store counts
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    universities: 0,
    referral: 0,
     partners:0,
    subadmin: 0,
  });

  // ✅ Fetch counts from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, teachersRes, uniRes, referralRes, partnersRes,   subadminRes] =
          await Promise.all([
            getStudents(),
            getTeachers(),
            getUniversity(),
            getReferral(),
            getPartners(),
            getSubAdmins(),
          ]);

        setCounts({
          students: studentsRes?.data?.length || 0,
          teachers: teachersRes?.data?.length || 0,
          universities: uniRes?.data?.length || 0,
          referral: referralRes?.data?.length || 0,
          partners : partnersRes?.data?.length || 0,
          subadmin: subadminRes?.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleSection = (title) =>
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));

  const handleItemClick = (item) => setActiveItem(item.title);

return (
  <div className="flex min-h-screen w-screen bg-gray-50 flex-col md:flex-row">
    {/* ---------------- Desktop Sidebar (md+) ---------------- */}
    <aside className="hidden md:flex md:flex-col md:sticky md:top-0 md:h-screen w-64 bg-white border-r p-4 overflow-y-auto">
      <div className="text-2xl font-bold border-b-2 p-1 border-gray-200 mb-6 lg:mb-8">Larnik</div>

      {menuItems.map((item) => (
        <div key={item.title} className="mb-1">
          <div
            onClick={() =>
              item.children ? toggleSection(item.title) : handleItemClick(item)
            }
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors
              ${activeItem === item.title ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            <span className="flex-1 truncate">{item.title}</span>
            {item.children && (
              <span className="text-xs opacity-70">{openSections[item.title] ? "▲" : "▼"}</span>
            )}
          </div>

          {item.children && openSections[item.title] && (
            <div className="ml-6 mt-1 space-y-1">
              {item.children.map((child) => (
                <div
                  key={child.title}
                  onClick={() => handleItemClick(child)}
                  className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors
                    ${activeItem === child.title ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                >
                  <span className="flex-shrink-0">{child.icon}</span>
                  <span className="truncate">{child.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>

    {/* ---------------- Mobile Sidebar (collapsible) ---------------- */}
    <div className="md:hidden w-full sticky top-0 z-30">
      <details className="bg-white border-b">
        <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold">Larnik</div>
            <span className="text-sm text-gray-500">Menu</span>
          </div>
          <div className="text-gray-700">☰</div>
        </summary>

        <div className="p-3 space-y-2 max-h-[60vh] overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.title}>
              <div
                onClick={() =>
                  item.children ? toggleSection(item.title) : handleItemClick(item)
                }
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors
                  ${activeItem === item.title ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="flex-1">{item.title}</span>
                {item.children && (
                  <span className="text-xs opacity-70">{openSections[item.title] ? "▲" : "▼"}</span>
                )}
              </div>

              {item.children && openSections[item.title] && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <div
                      key={child.title}
                      onClick={() => handleItemClick(child)}
                      className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors
                        ${activeItem === child.title ? "bg-blue-50 text-blue-600" : "text-gray-600"}`}
                    >
                      <span className="flex-shrink-0">{child.icon}</span>
                      <span>{child.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </details>
    </div>

    {/* ---------------- Main Content Area ---------------- */}
    <main className="flex-1 flex flex-col overflow-y-auto">
      {/* Top bar */}
      <div className="bg-white w-full h-14 sm:h-16 flex items-center justify-between px-3 sm:px-4 md:px-7 border-b sticky top-0 z-20">
        {/* Left: Search (on mobile this appears left) */}
        <div className="flex-1 min-w-0">
          <SearchBar />
        </div>

        {/* Right: icons + profile */}
        <div className="flex items-center gap-2 sm:gap-3 ml-2 sm:ml-4">
          <button
            className="hidden md:inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition"
            aria-label="Toggle theme"
            type="button"
          >
            <Sun size={20} />
          </button>

          <button
            className="hidden md:inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-100 transition"
            aria-label="Notifications"
            type="button"
          >
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-gray-100 transition cursor-pointer">
            <User />
            <span className="hidden sm:inline text-sm">Super Admin</span>
            <ChevronDown />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="w-full flex justify-center items-start bg-transparent p-3 sm:p-4 md:p-6">
        <div className="w-full max-w-7xl">
          {/* Dashboard */}
          {activeItem === "Dashboard" && (
            <div className="flex flex-col gap-4">
              <div className="w-full">
                <div className="bg-red-600 h-28 sm:h-32 rounded-xl w-full flex flex-col items-start justify-center p-4 sm:p-5 text-white">
                  <span className="text-xl sm:text-2xl font-bold">Admin Control Center 🛡️</span>
                  <span className="text-xs sm:text-sm opacity-90">Monitor and manage the entire platform</span>
                </div>
              </div>

              <h3 className="font-bold text-lg sm:text-xl mt-2">Quick Links</h3>

              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-2">
                <DashboardCard title={counts.students} subtitle="Students" icon={GraduationCap} colour="blue" />
                <DashboardCard title={counts.teachers} subtitle="Teachers" icon={Users} colour="purple" />
                <DashboardCard title={counts.universities} subtitle="Universities" icon={Building2} colour="orange" />
                <DashboardCard title={counts.referral} subtitle="Referral" icon={UserPlus} colour="green" />
                <DashboardCard title={counts.partners} subtitle="Partners" icon={UserPlus} colour="green" />
                <DashboardCard title={counts.subadmin} subtitle="Sub Admins" icon={Shield} colour="red" />
              </div>

              <div className="w-full mt-3 sm:mt-4">
                <CouponManager />
              </div>
            </div>
          )}

          {/* User Management */}
          {["Students", "Teachers", "University", "Referral","Partners", "Sub-Admin"].includes(activeItem) && (
            <div className="p-0 sm:p-2">
              <UserManagement role={activeItem} />
            </div>
          )}

          {/* Course Management */}
          {activeItem === "Course Management" && <CourseDashboard />}

          {/* Certificate Management */}
          {activeItem === "Certificate" && (
            <div className="flex flex-col gap-4 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">Certificate Management</h2>
              </div>

              <div className="w-full bg-white rounded-xl shadow p-3 sm:p-4">
                <CertificateManagerPage />
              </div>
            </div>
          )}

          {/* Reports */}
          {activeItem === "Report" && <ReportsDashboard />}

          {/* Notifications */}
          {activeItem === "Notifications" && <NotificationDashboard />}

          {/* Add User */}
          {activeItem === "Add User" && <ManageSubAdmins />}

          {/* Blog */}
          {activeItem === "Blog" && <BlogManagerDashboard />}

          {/* Governance */}
          {activeItem === "Governance" && (
            <div className="flex flex-col gap-4 p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4 gap-2">
                <h2 className="text-xl sm:text-2xl font-bold">Governance Management</h2>
              </div>

              <div className="w-full bg-white rounded-xl shadow p-3 sm:p-4">
                <GovernanceDashboard />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  </div>
);


}
