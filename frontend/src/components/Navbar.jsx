import React, { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomButton from './ui/CustomButton'

const decodeJwtPayload = (token) => {
  if (!token) return null;
  const raw = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
  const parts = raw.split(".");
  if (parts.length < 2) return null;
  try {
    const payloadB64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(payloadB64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch (err) {
    console.warn("Failed to decode JWT payload:", err);
    return null;
  }
};

const extractRoles = (payload) => {
  if (!payload) return [];
  // Common claim names: role, roles, user.role, user.roles
  let roles = [];

  if (payload.subAdminRole ? payload.subAdminRole : payload.role) {
  // if (payload.role) {
    // if (Array.isArray(payload.role)) roles = payload.role;
    if (Array.isArray(payload.role)) roles = payload.subAdminRole ? payload.subAdminRole : payload.role;
    else roles = [payload.subAdminRole ? payload.subAdminRole : payload.role];
  } else if (payload.roles) {
    roles = Array.isArray(payload.roles) ? payload.roles : [payload.roles];
  } else if (payload.user) {
    const u = payload.user;
    if (u.role) roles = Array.isArray(u.role) ? u.role : [u.role];
    else if (u.roles) roles = Array.isArray(u.roles) ? u.roles : [u.roles];
  }

  return roles
    .filter(Boolean)
    .map((r) => (typeof r === "string" ? r.toLowerCase() : String(r).toLowerCase()));
};

const roleToPath = (rolesArr = []) => {
  // Put more specific roles first if needed
  if (!rolesArr || rolesArr.length === 0) return "/"; // fallback home
  if (rolesArr.includes("superadmin") || rolesArr.includes("super_admin") || rolesArr.includes("admin")) return "/admin";
  if (rolesArr.includes("teacher") || rolesArr.includes("instructor")) return "/teacher";
  if (rolesArr.includes("blog-manager") || rolesArr.includes("blog_manager")) return "/blogManager";
  if (rolesArr.includes("career-cell") || rolesArr.includes("career_cell")) return "/careerCell";
  if (rolesArr.includes("student")) return "/student";
  if (rolesArr.includes("referral") || rolesArr.includes("referralpartner")) return "/ReferralPartner";
  if (rolesArr.includes("university")) return "/University";
  if (rolesArr.includes("financemanager") || rolesArr.includes("finance_manager")) return "/financemanager";
  // default fallback
  return "/";
};

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("/"); // dynamic dashboard link
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // re-check login status whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // compute dashboard path from token (JWT)
    const payload = decodeJwtPayload(token);
    
    const roles = extractRoles(payload);
    console.log(roles,"mm");
    const path = roleToPath(roles);
    
    setDashboardPath(path);

    // close mobile menu on navigation
    setMobileOpen(false);
  }, [location]); // re-run on route change (and mount)

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-white/40 shadow sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2" onClick={() => setMobileOpen(false)}>
          <div className="bg-green-700 text-white p-2 rounded-xl">
            <BookOpen size={20} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg sm:text-xl text-gray-800">Larnik</span>
            <span className="hidden sm:inline font-medium text-xs sm:text-sm text-gray-800 bg-green-100 px-2 py-0.5 rounded-2xl">
              LMS
            </span>
          </div>
        </Link>

        {/* Desktop Nav & Auth */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center space-x-6 text-gray-700 font-medium">
            <Link to="/" className="hover:text-black hover:underline hover:scale-105 transition-all">Home</Link>
            <Link to="/courses" className="hover:text-black hover:underline hover:scale-105 transition-all">Courses</Link>
            <Link to="/about" className="hover:text-black hover:underline hover:scale-105 transition-all">About</Link>
            <Link to="/contact" className="hover:text-black hover:underline hover:scale-105 transition-all">Contact</Link>
            <Link to={isLoggedIn ? dashboardPath : "/login"} className="hover:text-black hover:underline hover:scale-105 transition-all">Dashboard</Link>
          </nav>

          <div className="flex items-center space-x-3 text-green-800">
            {isLoggedIn ? (
              <CustomButton label={"Logout"} onClick={handleLogout} className={"bg-black"} />
            ) : (
              <>
                <Link to="/login">
                  <CustomButton label={"Login"} className={"bg-black"} />
                </Link>
                <Link to="/signup">
                  <CustomButton label={"Sign Up"} className={"bg-black"} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
            className="p-2 rounded-md inline-flex items-center justify-center text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (slide down) */}
      <div
        className={`md:hidden transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden bg-white/95 backdrop-blur-md border-t border-gray-100 ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 py-4 space-y-4">
          <nav className="flex flex-col gap-2 text-gray-700 font-medium">
            <Link onClick={() => setMobileOpen(false)} to="/" className="py-2 px-3 rounded hover:bg-gray-50">Home</Link>
            <Link onClick={() => setMobileOpen(false)} to="/courses" className="py-2 px-3 rounded hover:bg-gray-50">Courses</Link>
            <Link onClick={() => setMobileOpen(false)} to="/about" className="py-2 px-3 rounded hover:bg-gray-50">About</Link>
            <Link onClick={() => setMobileOpen(false)} to="/contact" className="py-2 px-3 rounded hover:bg-gray-50">Contact</Link>
            <Link onClick={() => setMobileOpen(false)} to={isLoggedIn ? dashboardPath : "/login"} className="py-2 px-3 rounded hover:bg-gray-50">Dashboard</Link>
          </nav>

          <div className="pt-2 border-t border-gray-100 flex flex-col gap-3">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md bg-black text-white font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <button className="w-full text-left px-3 py-2 rounded-md bg-black text-white font-medium">Login</button>
                </Link>
                <Link to="/signup" onClick={() => setMobileOpen(false)}>
                  <button className="w-full text-left px-3 py-2 rounded-md border border-gray-200 bg-white text-gray-800 font-medium">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
