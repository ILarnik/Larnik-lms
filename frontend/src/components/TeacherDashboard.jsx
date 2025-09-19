//  import React, { useState, useEffect } from "react";
// import { Upload, BookOpen, User, Wallet, Star, PlusCircle } from "lucide-react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CreateCourse from "./course_management/CreateCourse";
// import CourseList from "./course_management/CourseList";
// import ApproveCourse from "./course_management/ApproveCourse";
// import ManageModules from "./course_management/ManageModules";
// import SubmitExam from "./course_management/SubmitExam";
// import TeacherCertificates from "../pages/TeacherCertificatepage";
// import {
//   getTeacherProfile,
//   updateTeacherProfile,
//   getTeacherCourses,
//   getTeacherEarnings,
//   getTeacherReviews,
//   getWallet,
// } from "../api/api"; // Ensure these match your API.js

// export default function TeacherDashboard() {
//   const [activeTab, setActiveTab] = useState("profile");
//   const [profile, setProfile] = useState({ name: "", email: "", bank: "", upi: "", photo: null, _id: "" });
//   const [courses, setCourses] = useState([]);
//   const [reviews, setReviews] = useState([]);
//   const [wallet, setWallet] = useState({ balance: 0 });
//   const [earnings, setEarnings] = useState({ total: 0, payments: [] });

//   // ---------------- Profile Handlers ----------------
//   const handleProfileChange = (e) => {
//     const { name, value, files } = e.target;
//     setProfile(prev => ({ ...prev, [name]: files ? files[0] : value }));
//   };

//   const handleProfileSubmit = async () => {
//     try {
//       const formData = new FormData();
//       Object.entries(profile).forEach(([k, v]) => { if (v) formData.append(k, v); });
//       const res = await updateTeacherProfile(formData);
//       if (res.status === 200) toast.success("Profile updated successfully!");
//       fetchProfile(); // Refresh profile after update
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Server error updating profile");
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const res = await getTeacherProfile();
//       if (res.status === 200) setProfile(res.data);
//     } catch (err) {
//       toast.error("Failed to fetch profile");
//     }
//   };

//   // ---------------- Courses ----------------
//   const fetchCourses = async () => {
//     try {
//       const res = await getTeacherCourses();
//       if (res.status === 200) setCourses(res.data.courses);
//     } catch (err) {
//       toast.error("Failed to fetch courses");
//     }
//   };

//   // ---------------- Reviews ----------------
//   const fetchReviews = async () => {
//     try {
//       const res = await getTeacherReviews(); // use the api helper
//       setReviews(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to fetch reviews");
//     }
//   };

//   // ---------------- Wallet ----------------
//   const fetchWallet = async () => {
//     if (!profile._id) return;
//     try {
//       const res = await getWallet(profile._id, "teacher");
//       if (res.status === 200) setWallet(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to fetch wallet");
//     }
//   };
  
//   // ---------------- Earnings ----------------
//   const fetchEarnings = async () => {
//     try {
//       const res = await getTeacherEarnings();
//       if (res.status === 200 && res.data.success) {
//         setEarnings({
//           total: res.data.totalEarnings || 0,
//           payments: res.data.payments || [],
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching earnings:", err);
//       toast.error("Failed to fetch earnings");
//     }
//   };

//   // ---------------- Effects ----------------
//   useEffect(() => { fetchProfile(); }, []);

//   useEffect(() => {
//     if (activeTab === "courses") fetchCourses();
//     if (activeTab === "feedback") fetchReviews();
//     if (activeTab === "wallet") fetchWallet();
//     if (activeTab === "earnings") fetchEarnings();
//   }, [activeTab, profile._id]);

//   // ---------------- UI ----------------
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
//       <ToastContainer position="top-right" autoClose={2000} />

//       {/* Tabs */}
//       <div className="flex gap-4 border-b mb-6">
//         {["profile", "courses", "wallet", "feedback", "earnings","certificates"].map(tab => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`flex items-center gap-2 px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"}`}
//           >
//             {tab === "profile" && <User size={18} />}
//             {tab === "courses" && <BookOpen size={18} />}
//             {tab === "wallet" && <Wallet size={18} />}
//             {tab === "feedback" && <Star size={18} />}
//             {tab === "earnings" && <Wallet size={18} />} {/* you can change icon */}
//             {tab === "certificates" && <PlusCircle size={18} />}
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Profile Tab */}
//       {activeTab === "profile" && (
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="font-semibold mb-4">Profile Setup</h2>
//           <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleProfileChange} className="w-full border p-2 rounded mb-3" />
//           <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleProfileChange} className="w-full border p-2 rounded mb-3" />
//           <input type="text" name="bank" placeholder="Bank Account" value={profile.bank} onChange={handleProfileChange} className="w-full border p-2 rounded mb-3" />
//           <input type="text" name="upi" placeholder="UPI ID" value={profile.upi} onChange={handleProfileChange} className="w-full border p-2 rounded mb-3" />
//           <input type="file" name="photo" onChange={handleProfileChange} className="w-full border p-2 rounded mb-4" />
//           <button onClick={handleProfileSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Profile</button>
//         </div>
//       )}

//       {/* Courses Tab */}
//       {activeTab === "courses" && (
//         <div className="grid gap-6 p-6">
//           <CreateCourse onCreated={fetchCourses} />
//           <CourseList courses={courses} />
//           <ApproveCourse />
//           <ManageModules />
//           <SubmitExam />
//         </div>
//       )}

//       {/* Wallet Tab */}
//       {activeTab === "wallet" && (
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="font-semibold mb-4">Earnings & Settlements</h2>
//           <p className="text-gray-700">Current Balance: ₹{wallet.balance.toFixed(2)}</p>
//           <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">Request Settlement</button>
//         </div>
//       )}

//       {/* Feedback Tab */}
//       {activeTab === "feedback" && (
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="font-semibold mb-4">Student Reviews</h2>
//           {reviews.length === 0 ? (
//             <p className="text-gray-500">No reviews available yet.</p>
//           ) : (
//             reviews.map((course) => (
//               <div key={course.courseId} className="mb-4">
//                 <h3 className="font-semibold mb-2">{course.courseTitle}</h3>
//                 {course.reviews.length === 0 ? (
//                   <p className="text-gray-500">No reviews for this course.</p>
//                 ) : (
//                   course.reviews.map((r, idx) => (
//                     <div key={idx} className="border p-3 rounded mb-2">
//                       <p className="font-semibold">
//                         {r.student?.name || "Student"} ({r.student?.email || "N/A"})
//                       </p>
//                       <p>Rating: {r.rating}/5</p>
//                       <p>{r.review}</p>
//                     </div>
//                   ))
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       )}

//       {/* Earnings Tab */}
//       {activeTab === "earnings" && (
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="font-semibold mb-4">Earnings</h2>
//           <p className="text-gray-700 mb-2">Total Earnings: ₹{earnings.total.toFixed(2)}</p>

//           <h3 className="font-semibold mt-4 mb-2">Payment History</h3>
//           {earnings.payments.length > 0 ? (
//             <div className="space-y-2 max-h-64 overflow-y-auto">
//               {earnings.payments.map((p, idx) => (
//                 <div key={idx} className="border p-3 rounded flex justify-between">
//                   <p>Course ID: {p.course}</p>
//                   <p>Amount: ₹{p.amount}</p>
//                   <p>Status: {p.status}</p>
//                   <p>Date: {new Date(p.createdAt).toLocaleDateString()}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500">No earnings yet.</p>
//           )}
//         </div>
//       )}

//       {/* Certificates Tab */}
//       {activeTab === "certificates" && (
//         <div className="bg-white shadow rounded-xl p-6">
//           <h2 className="font-semibold mb-4">Issue Certificates</h2>
//           <TeacherCertificates />
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { Upload, BookOpen, User, Wallet, Star, PlusCircle } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourse from "./course_management/CreateCourse";
import CourseList from "./course_management/CourseList";
import ApproveCourse from "./course_management/ApproveCourse";
import ManageModules from "./course_management/ManageModules";
import SubmitExam from "./course_management/SubmitExam";
import TeacherCertificates from "../pages/TeacherCertificatepage";
import {
  getTeacherProfile,
  updateTeacherProfile,
  getTeacherCourses,
  getTeacherEarnings,
  getTeacherReviews,
  getWallet,
} from "../api/api";

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "", email: "", bank: "", upi: "", photo: null, _id: "" });
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [earnings, setEarnings] = useState({ total: 0, payments: [] });

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfile(prev => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleProfileSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([k, v]) => { if (v) formData.append(k, v); });
      const res = await updateTeacherProfile(formData);
      if (res.status === 200) toast.success("Profile updated successfully!");
      fetchProfile();
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error updating profile");
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await getTeacherProfile();
      if (res.status === 200) setProfile(res.data);
    } catch (err) {
      toast.error("Failed to fetch profile");
    }
  };

  const fetchCourses = async () => {
    try {
      const res = await getTeacherCourses();
      if (res.status === 200) setCourses(res.data.courses);
    } catch (err) {
      toast.error("Failed to fetch courses");
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await getTeacherReviews();
      setReviews(res.data);
    } catch (err) {
      toast.error("Failed to fetch reviews");
    }
  };

  const fetchWallet = async () => {
    if (!profile._id) return;
    try {
      const res = await getWallet(profile._id, "teacher");
      if (res.status === 200) setWallet(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch wallet");
    }
  };

  const fetchEarnings = async () => {
    try {
      const res = await getTeacherEarnings();
      if (res.status === 200 && res.data.success) {
        setEarnings({
          total: res.data.totalEarnings || 0,
          payments: res.data.payments || [],
        });
      }
    } catch (err) {
      toast.error("Failed to fetch earnings");
    }
  };

  useEffect(() => { fetchProfile(); }, []);
  useEffect(() => {
    if (activeTab === "courses") fetchCourses();
    if (activeTab === "feedback") fetchReviews();
    if (activeTab === "wallet") fetchWallet();
    if (activeTab === "earnings") fetchEarnings();
  }, [activeTab, profile._id]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-700">Teacher Dashboard</h1>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6 overflow-x-auto">
        {["profile", "courses", "wallet", "feedback", "earnings", "certificates"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === tab 
              ? "bg-green-100 text-green-800 border-t-2 border-green-600" 
              : "text-gray-600 hover:text-green-700"
            }`}
          >
            {tab === "profile" && <User size={18} />}
            {tab === "courses" && <BookOpen size={18} />}
            {tab === "wallet" && <Wallet size={18} />}
            {tab === "feedback" && <Star size={18} />}
            {tab === "earnings" && <Wallet size={18} />}
            {tab === "certificates" && <PlusCircle size={18} />}
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Profile Setup</h2>
          <input type="text" name="name" placeholder="Full Name" value={profile.name} onChange={handleProfileChange} className="w-full border border-green-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="email" name="email" placeholder="Email" value={profile.email} onChange={handleProfileChange} className="w-full border border-green-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="text" name="bank" placeholder="Bank Account" value={profile.bank} onChange={handleProfileChange} className="w-full border border-green-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="text" name="upi" placeholder="UPI ID" value={profile.upi} onChange={handleProfileChange} className="w-full border border-green-300 p-3 rounded-lg mb-3 focus:ring-2 focus:ring-green-300 outline-none" />
          <input type="file" name="photo" onChange={handleProfileChange} className="w-full border border-green-300 p-3 rounded-lg mb-4 focus:ring-2 focus:ring-green-300 outline-none" />
          <button onClick={handleProfileSubmit} className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md">Save Profile</button>
        </div>
      )}

      {/* Courses Tab */}
      {activeTab === "courses" && (
        <div className="grid gap-6 p-6">
          <CreateCourse onCreated={fetchCourses} />
          <CourseList courses={courses} />
          <ApproveCourse />
          <ManageModules />
          <SubmitExam />
        </div>
      )}

      {/* Wallet Tab */}
      {activeTab === "wallet" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Earnings & Settlements</h2>
          <p className="text-gray-700 mb-3">Current Balance: <span className="font-bold text-green-800">₹{wallet.balance.toFixed(2)}</span></p>
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition-all">Request Settlement</button>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === "feedback" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Student Reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews available yet.</p>
          ) : (
            reviews.map((course) => (
              <div key={course.courseId} className="mb-4">
                <h3 className="font-semibold mb-2 text-green-600">{course.courseTitle}</h3>
                {course.reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews for this course.</p>
                ) : (
                  course.reviews.map((r, idx) => (
                    <div key={idx} className="border border-green-200 p-4 rounded-lg mb-2 hover:shadow-lg transition-shadow bg-green-50">
                      <p className="font-semibold text-green-800">{r.student?.name || "Student"} ({r.student?.email || "N/A"})</p>
                      <p>Rating: {r.rating}/5</p>
                      <p>{r.review}</p>
                    </div>
                  ))
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Earnings Tab */}
      {activeTab === "earnings" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Earnings</h2>
          <p className="text-gray-700 mb-4">Total Earnings: <span className="font-bold text-green-800">₹{earnings.total.toFixed(2)}</span></p>
          <h3 className="font-semibold mb-2 text-green-600">Payment History</h3>
          {earnings.payments.length > 0 ? (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {earnings.payments.map((p, idx) => (
                <div key={idx} className="border border-green-200 p-3 rounded-lg flex justify-between hover:shadow-md bg-green-50 transition-shadow">
                  <p>Course ID: {p.course}</p>
                  <p>Amount: ₹{p.amount}</p>
                  <p>Status: {p.status}</p>
                  <p>Date: {new Date(p.createdAt).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No earnings yet.</p>
          )}
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === "certificates" && (
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-green-200">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Issue Certificates</h2>
          <TeacherCertificates />
        </div>
      )}
    </div>
  );
}
