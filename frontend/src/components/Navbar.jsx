// import React, { useEffect, useState } from "react";
// import { BookOpen } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import CustomButton from './ui/CustomButton'

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // re-check login status whenever route changes
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <header className="w-full bg-white/40 shadow sticky top-0 z-50 backdrop-blur-md">
//       <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 shadow-[-0px_20px_22px_-15px_rgba(0,0,0,0.1)]">
        
//         {/* Logo */}
//         <Link to="/">
//           <div className="flex items-center space-x-2 ml-40">
//             <div className="bg-green-700 text-white p-2 rounded-xl">
//               <BookOpen size={20} />
//             </div>
//             <span className="font-bold text-xl text-gray-800">Larnik</span>
//             <span className="font-medium text-sm text-gray-800 bg-green-100 px-2 py-0.5 rounded-2xl">
//               LMS
//             </span>
//           </div>
//         </Link>

//         {/* Navigation Links */}
//         <nav className="hidden md:flex space-x-6 text-gray-700 font-medium ml-30">
//           <Link to="/" className="hover:text-green-600 ml-40">Home</Link>
//           <Link to="/courses" className="hover:text-green-600 ml-40">Courses</Link>
//           <Link to="/about" className="hover:text-green-600">About</Link>
//           <Link to="/contact" className="hover:text-green-600">Contact</Link>
//           <Link to="/admin" className="hover:text-green-600">Dashboard</Link>
//         </nav>

//         {/* Login/Signup OR Logout */}
//         <div className="hidden md:flex items-center space-x-3 text-green-800 ml-y">
//           {isLoggedIn ? (
//             // <button 
//             //   onClick={handleLogout} 
//             //   className="hover:text-red-600 ml-40"
//             // >
//             //   Logout
//             // </button>
//             <CustomButton label={'Logout'} onClick={handleLogout} />
//           ) : (
//             <>
//               <Link to="/login">
//                 {/* <button className="hover:text-green-600 ml-40">Login</button> */}
//                 <CustomButton label={'Login'} />
//               </Link>
//               <Link to="/signup">
//                 {/* <button className="hover:text-green-600">Sign Up</button> */}
//                 <CustomButton label={'Sign Up'} />
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }




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

  if (payload.role) {
    if (Array.isArray(payload.role)) roles = payload.role;
    else roles = [payload.role];
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
  const navigate = useNavigate();
  const location = useLocation();

  // re-check login status whenever route changes
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // compute dashboard path from token (JWT)
    const payload = decodeJwtPayload(token);
    const roles = extractRoles(payload);
    const path = roleToPath(roles);
    setDashboardPath(path);
  }, [location]); // re-run on route change (and mount)

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="w-full bg-white/40 shadow sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 shadow-[-0px_20px_22px_-15px_rgba(0,0,0,0.1)]">
        
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2 ml-40">
            <div className="bg-green-700 text-white p-2 rounded-xl">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-xl text-gray-800">Larnik</span>
            <span className="font-medium text-sm text-gray-800 bg-green-100 px-2 py-0.5 rounded-2xl">
              LMS
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium ml-30">
          <Link to="/" className="hover:text-black hover:scale-125 hover:transition-all ml-40 hover:underline">Home</Link>
          <Link to="/courses" className="hover:text-black hover:scale-125 hover:transition-all ml-40 hover:underline">Courses</Link>
          <Link to="/about" className="hover:text-black hover:scale-125 hover:transition-all hover:underline">About</Link>
          <Link to="/contact" className="hover:text-black hover:scale-125 hover:transition-all hover:underline">Contact</Link>

          {/* Dynamic Dashboard link */}
          <Link to={isLoggedIn ? dashboardPath : "/login"} className="hover:text-black hover:scale-125 hover:transition-all hover:underline">
            Dashboard
          </Link>
        </nav>

        {/* Login/Signup OR Logout */}
        <div className="hidden md:flex items-center space-x-3 text-green-800 ml-y">
          {isLoggedIn ? (
            <CustomButton label={'Logout'} onClick={handleLogout} className={"bg-black"} />
          ) : (
            <>
              <Link to="/login">
                <CustomButton label={'Login'} className={"bg-black"} />
              </Link>
              <Link to="/signup">
                <CustomButton label={'Sign Up'} className={"bg-black"} />
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
