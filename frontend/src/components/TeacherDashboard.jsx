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
  teacherRequestSettlement,
} from "../api/api"; // Ensure these match your API.js

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bank: "",
    upi: "",
    photo: null,
    _id: "",
  });
  const [courses, setCourses] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [earnings, setEarnings] = useState({ total: 0, payments: [] });
  const [settlementAmount, setSettlementAmount] = useState("");
  const [affiliatedUniversity, setAffiliatedUniversity] = useState("");

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfile((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleProfileSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(profile).forEach(([k, v]) => {
        if (v) formData.append(k, v);
      });
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
    try {
      if (!profile._id) return; // wait until profile is loaded
      const res = await getWallet("teacher", profile._id); // ownerType "teacher"
      if (res.status === 200) {
        setWallet(res.data);
      }
    } catch (err) {
      console.error("Error fetching wallet:", err);
      toast.error("Failed to fetch wallet");
    }
  };

  const handleSettlementRequest = async () => {
    if (!settlementAmount || settlementAmount <= 0) {
      toast.error("Enter a valid settlement amount");
      return;
    }

    try {
      const payload = {
        amount: Number(settlementAmount),
        teacherId: profile._id,
        affiliatedUniversity: affiliatedUniversity || undefined,
      };

      const res = await teacherRequestSettlement(payload);
      if (res.data.success) {
        toast.success("Settlement request submitted successfully!");
        setSettlementAmount("");
        setAffiliatedUniversity("");
        fetchWallet();
      } else {
        toast.error(res.data.message || "Settlement request failed");
      }
    } catch (err) {
      console.error("Settlement request error:", err);
      toast.error(
        err.response?.data?.message || "Server error during settlement request"
      );
    }
  };

  // ---------------- Earnings ----------------
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

  // ---------------- Effects ----------------
  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (activeTab === "courses") fetchCourses();
    if (activeTab === "feedback") fetchReviews();
    if (activeTab === "wallet") fetchWallet();
    if (activeTab === "earnings") fetchEarnings();
  }, [activeTab, profile._id]);

return (
  <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-green-700">Teacher Dashboard</h1>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 md:gap-4 border-b mb-6 whitespace-nowrap">
          {[
            "profile",
            "courses",
            "wallet",
            "feedback",
            "earnings",
            "certificates",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "flex items-center gap-2 px-3 py-2 rounded-md transition",
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-50",
              ].join(" ")}
              aria-pressed={activeTab === tab}
              aria-label={tab}
            >
              {tab === "profile" && <User size={18} />}
              {tab === "courses" && <BookOpen size={18} />}
              {tab === "wallet" && <Wallet size={18} />}
              {tab === "feedback" && <Star size={18} />}
              {tab === "earnings" && <Wallet size={18} />}
              {tab === "certificates" && <PlusCircle size={18} />}
              <span className="text-sm sm:text-base capitalize">{tab}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-xl p-4 md:p-6 space-y-4">
            <h2 className="font-semibold text-lg">Profile Setup</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={profile.name || ""}
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={profile.email || ""}
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
              <input
                type="text"
                name="bank"
                placeholder="Bank Account"
                value={profile.bank || ""}
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
              <input
                type="text"
                name="upi"
                placeholder="UPI ID"
                value={profile.upi || ""}
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
              <div className="md:col-span-2">
                <input
                  type="file"
                  name="photo"
                  onChange={handleProfileChange}
                  className="w-full border rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleProfileSubmit}
                className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div className="grid gap-6 p-2 md:p-6">
            <CreateCourse onCreated={fetchCourses} />
            <CourseList courses={courses} />
            <ApproveCourse />
            <ManageModules />
            <SubmitExam />
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === "wallet" && (
          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <h2 className="font-semibold mb-4">Earnings & Settlements</h2>
            <p className="text-gray-700">
              Current Balance: ₹{wallet.balance?.toFixed(2) || "0.00"}
            </p>

            {/* Settlement Request Form */}
            <div className="mt-6 space-y-4">
              <h3 className="font-medium mb-2">Request Settlement</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={settlementAmount}
                  onChange={(e) => setSettlementAmount(e.target.value)}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Affiliated University ID (optional)"
                  value={affiliatedUniversity}
                  onChange={(e) => setAffiliatedUniversity(e.target.value)}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSettlementRequest}
                  className="w-full md:w-auto px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Submit Settlement Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-green-200">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Student Reviews
            </h2>

            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews available yet.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((course) => (
                  <div key={course.courseId} className="space-y-3">
                    <h3 className="font-semibold mb-2 text-green-600">
                      {course.courseTitle}
                    </h3>

                    {course.reviews.length === 0 ? (
                      <p className="text-gray-500">No reviews for this course.</p>
                    ) : (
                      <div className="space-y-3">
                        {course.reviews.map((r, idx) => (
                          <div
                            key={idx}
                            className="border p-3 rounded bg-white shadow-sm"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-semibold">
                                  {r.student?.name || "Student"}{" "}
                                  <span className="text-xs text-gray-400">
                                    ({r.student?.email || "N/A"})
                                  </span>
                                </p>
                                <p className="text-sm text-yellow-600">
                                  Rating: {r.rating}/5
                                </p>
                              </div>
                              <div className="text-xs text-gray-400">
                                {new Date(r.createdAt || Date.now()).toLocaleDateString()}
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{r.review}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === "earnings" && (
          <div className="bg-white shadow rounded-xl p-4 md:p-6">
            <h2 className="font-semibold mb-4">Earnings</h2>
            <p className="text-gray-700 mb-2">
              Total Earnings: ₹{earnings.total?.toFixed(2) || "0.00"}
            </p>

            <h3 className="font-semibold mt-4 mb-2">Payment History</h3>

            {earnings.payments && earnings.payments.length > 0 ? (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {earnings.payments.map((p, idx) => (
                  <div
                    key={idx}
                    className="border p-3 rounded flex flex-col md:flex-row md:justify-between gap-2"
                  >
                    <p className="text-sm">Course ID: {p.course}</p>
                    <p className="text-sm">Amount: ₹{p.amount}</p>
                    <p className="text-sm">Status: {p.status}</p>
                    <p className="text-sm">
                      Date: {new Date(p.createdAt).toLocaleDateString()}
                    </p>
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
          <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 border border-green-200">
            <h2 className="text-xl font-semibold mb-4 text-green-700">
              Issue Certificates
            </h2>
            <TeacherCertificates />
          </div>
        )}
      </div>
    </div>
  </div>
);

}
