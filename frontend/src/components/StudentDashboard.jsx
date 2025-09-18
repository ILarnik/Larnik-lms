 // src/pages/StudentDashboard.jsx
import React, { useEffect, useState } from "react";
import { User, ClipboardList, Star } from "lucide-react";
import {
  getStudentProfile,
  updateStudentProfile,
  getMyCourses,
  submitReview,
  getCertificates,
  downloadCertificate
} from "../api/api"; // ✅ corrected path
import StudentCertificate from "../pages/StudentCertificate";
import CustomButton from "./ui/CustomButton";
 

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [myCourses, setMyCourses] = useState([]);
  const [reviewCourse, setReviewCourse] = useState("");
  const [reviewText, setReviewText] = useState([]);
  const [certificates, setCertificates] = useState([]);

  // ---------------- Profile ----------------
  const fetchProfile = async () => {
    try {
      const { data } = await getStudentProfile();
      setProfile(data);
    } catch (err) {
      console.error("Failed to fetch profile", err);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async () => {
    try {
      await updateStudentProfile(profile);
      fetchProfile();
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  // ---------------- My Courses ----------------
  const fetchMyCourses = async () => {
    try {
      const { data } = await getMyCourses();
      if (data.success) setMyCourses(data.courses);
    } catch (err) {
      console.error("Failed to fetch my courses", err);
    }
  };

  // ---------------- Reviews ----------------
  const handleReviewSubmit = async () => {
    if (!reviewCourse || !reviewText) return;
    try {
      await submitReview({ courseId: reviewCourse, review: reviewText });
      setReviewCourse("");
      setReviewText("");
    } catch (err) {
      console.error("Review submit failed", err);
    }
  };

  // ---------------- Certificates ----------------
  const fetchCertificates = async () => {
    try {
      const { data } = await getCertificates();
      if (data.success) setCertificates(data.certificates);
    } catch (err) {
      console.error("Failed to fetch certificates", err);
    }
  };

  const handleDownloadCertificate = async (certId) => {
    try {
      const res = await downloadCertificate(certId);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${certId}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  // ---------------- Effects ----------------
  useEffect(() => {
    if (activeTab === "profile") fetchProfile();
    if (activeTab === "mycourses") fetchMyCourses();
    if (activeTab === "certificates") fetchCertificates();
  }, [activeTab]);

  // ---------------- Render ----------------
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b mb-6">
        {[
          { key: "profile", label: "Profile", icon: <User size={18} /> },
          { key: "mycourses", label: "My Courses", icon: <ClipboardList size={18} /> },
          { key: "reviews", label: "Reviews", icon: <Star size={18} /> },
          { key: "certificates", label: "Certificates", icon: <ClipboardList size={18} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 ${
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="bg-white shadow rounded-xl p-6 space-y-3">
          <h2 className="font-semibold mb-4">My Profile</h2>
          <input
            type="text"
            name="name"
            value={profile.name}
            placeholder="Full Name"
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            placeholder="Email"
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="phone"
            value={profile.phone}
            placeholder="Phone"
            onChange={handleProfileChange}
            className="w-full border p-2 rounded"
          />
          <button
            onClick={handleProfileSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Profile
          </button>
        </div>
      )}

      {/* My Courses Tab */}
      {activeTab === "mycourses" && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">My Courses</h2>
          {myCourses.map((c) => (
            <div key={c._id} className="border p-4 rounded-lg bg-white">
              <h3 className="font-extrabold text-2xl">{c.title}</h3>
              <hr />
              <p>{c.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === "reviews" && (
        <div className="bg-white shadow rounded-xl p-6 space-y-3">
          <h2 className="font-semibold">Leave a Review</h2>
          <select
            value={reviewCourse}
            onChange={(e) => setReviewCourse(e.target.value)}
            className="w-full border p-2 rounded bg-white"
          >
            <option value="">Select a course</option>
            {myCourses.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            className="w-full border p-2 rounded bg-white"
            rows="4"
          />
          <button
            onClick={handleReviewSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit Review
          </button>
        </div>
      )}

      {/* Certificates Tab */}
      {activeTab === "certificates" && (
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">My Certificates</h2>
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="border p-4 rounded-lg flex justify-between items-center bg-white"
            >
              <p>{cert.courseTitle}</p>
              {/* <button
                onClick={() => handleDownloadCertificate(cert._id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Download
              </button> */}
              <CustomButton label={"Download"} onClick={()=>handleDownloadCertificate(cert._id)} className={"bg-black"} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
