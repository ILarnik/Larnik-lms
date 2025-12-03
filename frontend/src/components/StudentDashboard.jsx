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
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0); // ⭐ new rating state
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
    if (!reviewCourse || !reviewText || !rating) return;
    try {
      await submitReview({ courseId: reviewCourse, review: reviewText, rating }); // send rating too
      setReviewCourse("");
      setReviewText("");
      setRating(0);
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
  <div className="p-4 md:p-6 lg:p-8">
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Student Dashboard</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 border-b mb-6">
        {[
          { key: "profile", label: "Profile", icon: <User size={18} /> },
          { key: "mycourses", label: "My Courses", icon: <ClipboardList size={18} /> },
          { key: "reviews", label: "Reviews", icon: <Star size={18} /> },
          { key: "certificates", label: "Certificates", icon: <ClipboardList size={18} /> },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={[
              "flex items-center gap-2 px-3 py-2 rounded-md transition",
              activeTab === tab.key
                ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
            ].join(" ")}
            aria-pressed={activeTab === tab.key}
            aria-label={tab.label}
          >
            <span className="hidden sm:inline-flex">{tab.icon}</span>
            <span className="text-sm sm:text-base">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white shadow rounded-xl p-4 md:p-6 space-y-4">
            <h2 className="font-semibold text-lg">My Profile</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={profile.name}
                placeholder="Full Name"
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                placeholder="Email"
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
              <input
                type="text"
                name="phone"
                value={profile.phone}
                placeholder="Phone"
                onChange={handleProfileChange}
                className="w-full border rounded-md p-2"
              />
            </div>

            <div>
              <button
                onClick={handleProfileSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* My Courses Tab */}
        {activeTab === "mycourses" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">My Courses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myCourses.map((c) => (
                <div key={c._id} className="border p-4 rounded-lg bg-white">
                  <h3 className="font-extrabold text-xl md:text-2xl">{c.title}</h3>
                  <hr className="my-3" />
                  <p className="text-sm text-gray-700">{c.description}</p>
                </div>
              ))}
              {myCourses.length === 0 && (
                <div className="col-span-full p-6 text-center text-gray-500 bg-white rounded-lg">
                  You have no enrolled courses yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="bg-white shadow rounded-xl p-4 md:p-6 space-y-4">
            <h2 className="font-semibold text-lg">Leave a Review</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={reviewCourse}
                onChange={(e) => setReviewCourse(e.target.value)}
                className="w-full border rounded-md p-2 bg-white"
              >
                <option value="">Select a course</option>
                {myCourses.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>

              {/* Rating - Star Selector */}
              <div>
                <label className="block mb-1 font-medium">Rating</label>
                <div className="flex items-center gap-0.5 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(rating === star ? 0 : star)}
                      className="focus:outline-none bg-transparent p-0 border-none shadow-none outline-none"
                      style={{ boxShadow: 'none', border: 'none', outline: 'none' }}
                      aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill={star <= rating ? '#fbbf24' : 'none'}
                        stroke="#fbbf24"
                        strokeWidth={2}
                        className="w-6 h-6 cursor-pointer transition"
                        style={{ boxShadow: 'none', border: 'none', outline: 'none' }}
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              className="w-full border p-3 rounded-md bg-white"
              rows={4}
            />

            <div>
              <button
                onClick={handleReviewSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Submit Review
              </button>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === "certificates" && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">My Certificates</h2>

            <div className="grid grid-cols-1 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert._id}
                  className="border p-4 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center bg-white"
                >
                  <div className="mb-3 md:mb-0">
                    <p className="font-medium">{cert.courseTitle}</p>
                    {cert.issuedAt && (
                      <p className="text-xs text-gray-500">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
                    )}
                  </div>

                  <div className="self-end md:self-center">
                    <CustomButton label={"Download"} onClick={() => handleDownloadCertificate(cert._id)} className={"bg-black"} />
                  </div>
                </div>
              ))}
              {certificates.length === 0 && (
                <div className="p-6 text-center text-gray-500 bg-white rounded-lg">
                  No certificates available.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

}
