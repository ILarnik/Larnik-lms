import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApproveCourses } from "../api/api";
import { jwtDecode } from "jwt-decode";
import EnrollButton from "../components/EnrollButton";

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [userId, setUserId] = useState("");

  // Get user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    }
  }, []);

  // Fetch single course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await getApproveCourses();
        const allCourses = res.data || [];
        const foundCourse = allCourses.find((c) => c._id === id);
        setCourse(foundCourse);
      } catch (err) {
        console.error("Error fetching course:", err);
      }
    };
    fetchCourse();
  }, [id]);

  if (!course)
    return <div className="text-center pt-10 text-xl">Loading course details...</div>;

  // Calculate average rating
  const avgRating =
    course.reviews && course.reviews.length > 0
      ? (
          course.reviews.reduce((sum, r) => sum + r.rating, 0) /
          course.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-green-800 mb-2">{course.title}</h1>
          <p className="text-gray-600 text-lg mb-4">by {course.createdBy?.name || "Unknown"}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
              {course.category} / {course.subCategory}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              Duration: {course.duration}
            </span>
            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              Price: {course.price === 0 ? "Free" : `₹${course.price}`}
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              Enrolled: {course.totalEnrolledStudents}
            </span>
            {avgRating && (
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full">
                Rating: {avgRating} ⭐
              </span>
            )}
          </div>

          {course.targetAudience && (
            <p className="mb-2"><strong>Target Audience:</strong> {course.targetAudience}</p>
          )}
          {course.prerequisites && (
            <p className="mb-2"><strong>Prerequisites:</strong> {course.prerequisites}</p>
          )}

          {/* Tags */}
          {course.tags && course.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {course.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-green-200 text-green-900 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Enroll Section */}
        <div className="flex flex-col items-center justify-start gap-4 md:w-64">
          <div className="bg-green-50 p-4 rounded-xl shadow-inner w-full text-center">
            <p className="text-gray-700 mb-2">Start learning today!</p>
            <EnrollButton course={course} userId={userId} />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Course Overview</h2>
        <p className="text-gray-700 leading-relaxed">{course.description}</p>
      </div>

      {/* Modules */}
      {course.modules && course.modules.length > 0 && (
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Course Curriculum</h2>
          <ul className="space-y-3">
            {course.modules.map((m, idx) => (
              <li key={idx} className="border-l-4 border-green-500 pl-4">
                <p className="font-semibold text-lg">{m.title}</p>
                <p className="text-gray-600 text-sm">
                  Videos: {m.videos.length} | Notes: {m.notes ? "Yes" : "No"} | Assignments: {m.assignment ? "Yes" : "No"} | MCQs: {m.mcqs.length}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
