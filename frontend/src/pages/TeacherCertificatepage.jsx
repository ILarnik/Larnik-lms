 import React, { useState } from "react";
import { toast } from "react-toastify";
import { issueCertificate } from "../api/api"; // make sure this points to your API helper

export default function TeacherCertificates() {
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    courseTitle: "",
    courseuniqueId: "",
    score: 0,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await issueCertificate(formData);
      if (res.data.success) {
        toast.success("Certificate request submitted for approval!");
        setFormData({
          studentName: "",
          studentEmail: "",
          courseTitle: "",
          courseuniqueId: "",
          score: 0,
        });
      } else {
        toast.error(res.data.message || "Failed to submit certificate");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Server error while issuing certificate");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <p className="text-gray-500 text-sm">Certificate will use the default template.</p>

      <input
        type="text"
        name="studentName"
        placeholder="Student Name"
        value={formData.studentName}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="studentEmail"
        placeholder="Student Email"
        value={formData.studentEmail}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="courseTitle"
        placeholder="Course Title"
        value={formData.courseTitle}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="courseuniqueId"
        placeholder="Course Unique ID"
        value={formData.courseuniqueId}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="number"
        name="score"
        placeholder="Score (optional)"
        value={formData.score}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Submitting..." : "Issue Certificate"}
      </button>
    </form>
  );
}
