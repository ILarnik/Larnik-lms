import React, { useEffect, useState } from "react";
import { getApproveCourses, getCoupons } from "../api/api";
import CourseCard from "../components/CourseCard";
import DiscountBar from "../components/DiscountBar";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userId, setUserId] = useState([]);
  const location = useLocation();

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const decoded = jwtDecode(token); // ✅ decode JWT
        // console.log(decoded,"my");
        
        setUserId(decoded.id);
      // console.log("Decoded JWT:", decoded.id);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message || "Failed to fetch.");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch approved courses
        const coursesRes = await getApproveCourses();
        const allCourses = coursesRes.data || [];

        // Check for search param
        const params = new URLSearchParams(location.search);
        const searchParam = params.get("search");
        let matchingCourses = [];
        let otherCourses = [];

        if (searchParam) {
          // If searchParam looks like an ObjectId, match by ID, else match by keyword
          const isObjectId = /^[a-f\d]{24}$/i.test(searchParam);
          if (isObjectId) {
            const idx = allCourses.findIndex(c => c._id === searchParam);
            if (idx !== -1) {
              matchingCourses = [allCourses[idx]];
              otherCourses = allCourses.filter((c, i) => i !== idx);
            } else {
              matchingCourses = [];
              otherCourses = allCourses;
            }
          } else {
            // Keyword matching (title or description)
            const keyword = searchParam.trim().toLowerCase();
            matchingCourses = allCourses.filter(c =>
              c.title?.toLowerCase().includes(keyword) ||
              c.description?.toLowerCase().includes(keyword)
            );
            otherCourses = allCourses.filter(c =>
              !(
                c.title?.toLowerCase().includes(keyword) ||
                c.description?.toLowerCase().includes(keyword)
              )
            );
          }
        } else {
          matchingCourses = [];
          otherCourses = allCourses;
        }
        setCourses({ matchingCourses, otherCourses });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.search]);

return (
  <>
    <div className="bg-green-200 py-8 sm:py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6">
          Available Courses
        </h1>

        {/* Matching Courses Section */}
        {/* Only show matching section if a search has been performed */}
        {location.search.includes('search=') && (
          <>
            <h2 className="text-xl font-semibold text-green-800 mb-4">Searched Results</h2>
            {courses.matchingCourses && courses.matchingCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {courses.matchingCourses.map((course) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    userId={userId}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center mb-8">No matching results found.</p>
            )}
          </>
        )}

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Other Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.otherCourses && courses.otherCourses.length > 0 ? (
            courses.otherCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                userId={userId}
              />
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No courses available right now.
            </p>
          )}
        </div>
      </div>
    </div>
  </>
);

}
